import { IAnalyticsRepository } from '../domain/interfaces/IAnalyticsRepository';
import { IVectorRepository } from '../domain/interfaces/IVectorRepository';
import { TransformationService } from '../domain/TransformationService';
import { InternalEvent } from '../domain/models/InternalEvent';
import { EventType } from '../domain/EventModels';
import { OpenAIGateway } from '../infrastructure/OpenAIGateway';

/**
 * Application Service responsible for processing CDC events.
 * Handles the "Transform" and "Load" phases of the ELT pipeline.
 * - Transforms Salla DTOs to Analytical Facts.
 * - Inserts data into ClickHouse (OLAP).
 * - Generates Embeddings and Upserts to Vector DB (RAG).
 */
export class ProcessCDCEventUseCase {
    private readonly _analyticsRepo: IAnalyticsRepository;
    private readonly _vectorRepo: IVectorRepository;
    private readonly _openAiGateway: OpenAIGateway;
    private readonly _transformer: TransformationService;

    constructor(
        analyticsRepo: IAnalyticsRepository,
        vectorRepo: IVectorRepository,
        openAiGateway: OpenAIGateway,
        transformer: TransformationService
    ) {
        this._analyticsRepo = analyticsRepo;
        this._vectorRepo = vectorRepo;
        this._openAiGateway = OpenAIGateway.getInstance(); // Assuming Singleton usage from Infra layer or passed via DI
        this._transformer = transformer;
    }

    /**
     * Processes a normalized internal event.
     * @param event The internal event payload dequeued from QStash
     */
    public async execute(event: InternalEvent): Promise<void> {
        console.log(`[ProcessCDCEventUseCase] Processing event ${event.eventId} type: ${event.type}`);

        try {
            switch (event.type) {
                case EventType.ORDER_CREATED:
                case EventType.ORDER_UPDATED:
                    await this.processOrderEvent(event);
                    break;

                case EventType.CART_ABANDONED:
                    await this.processAbandonedCartEvent(event);
                    break;

                case EventType.PRODUCT_UPDATED:
                    await this.processProductEvent(event);
                    break;

                default:
                    console.warn(`[ProcessCDCEventUseCase] No processor defined for event type: ${event.type}`);
                    break;
            }
        } catch (error) {
            console.error(`[ProcessCDCEventUseCase] Failed to process event ${event.eventId}:`, error);
            // Re-throwing allows QStash to handle retries and DLQ
            throw error;
        }
    }

    /**
     * Handles Order events:
     * 1. Transform to SalesFact
     * 2. Insert to ClickHouse
     * 3. (Optional) Vectorize text for RAG if useful (e.g., customer notes)
     */
    private async processOrderEvent(event: InternalEvent): Promise<void> {
        const salesFacts = this._transformer.transformOrderToSalesFacts(event.payload);
        
        if (salesFacts.length > 0) {
            // Bulk insert all line items for this order
            await this._analyticsRepo.insertSalesFact(salesFacts);
            console.log(`[ProcessCDCEventUseCase] Inserted ${salesFacts.length} sales facts for Order ${event.payload.id}`);
        }
    }

    /**
     * Handles Abandoned Cart events:
     * 1. Transform to AbandonedCartFact
     * 2. Insert to ClickHouse
     */
    private async processAbandonedCartEvent(event: InternalEvent): Promise<void> {
        const cartFact = this._transformer.transformCartToAbandonedCartFact(event.payload);
        
        if (cartFact) {
            // We wrap in array as repo expects batch
            await this._analyticsRepo.insertAbandonedCartFact([cartFact]);
            console.log(`[ProcessCDCEventUseCase] Inserted abandoned cart fact for Cart ${event.payload.id}`);
        }
    }

    /**
     * Handles Product events (Enrichment for RAG):
     * 1. Generate Embedding for Product Name/Description
     * 2. Upsert to Vector DB
     * Note: Products might also have a Dimension table in ClickHouse, handled here if required.
     */
    private async processProductEvent(event: InternalEvent): Promise<void> {
        const product = event.payload;
        
        // Prepare text for embedding
        // Format: "Product Name: [Name]. Description: [Desc]. Categories: [Cats]"
        const textToEmbed = this._transformer.prepareProductForEmbedding(product);
        
        if (textToEmbed) {
            // Generate Vector
            const vector = await this._openAiGateway.generateEmbedding(textToEmbed);
            
            // Upsert to Pinecone
            await this._vectorRepo.upsertVectors([{
                id: `prod_${product.id}`,
                values: vector,
                metadata: {
                    merchantId: event.merchantId || 'unknown',
                    entityType: 'product',
                    content: textToEmbed,
                    productId: product.id,
                    productName: product.name
                }
            }]);
            
            console.log(`[ProcessCDCEventUseCase] Vectorized and stored product ${product.id}`);
        }
    }
}