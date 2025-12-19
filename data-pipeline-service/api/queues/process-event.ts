import { GlobalBootstrap } from '../../src/infrastructure/GlobalBootstrap';
import { QStashSignatureValidator } from '../_middlewares/QStashSignatureValidator';
import { ProcessCDCEventUseCase } from '../../src/application/ProcessCDCEventUseCase';
import { ClickHouseRepository } from '../../src/infrastructure/ClickHouseRepository';
import { PineconeRepository } from '../../src/infrastructure/PineconeRepository';
import { OpenAIGateway } from '../../src/infrastructure/OpenAIGateway';
import { TransformationService } from '../../src/domain/TransformationService';
import { PostgresSyncRepository } from '../../src/infrastructure/PostgresSyncRepository'; // Used for idempotency/state
import { ServiceConfig } from '../../src/config/ServiceConfig';
import { InternalEvent } from '../../src/domain/models/InternalEvent';

/**
 * Queue Worker: Process Event
 * Consumes normalized events from QStash.
 * Handles ELT logic: Transformation, Loading to ClickHouse, and Vectorization.
 */
export default async function handler(req: Request) {
  const logger = console;

  // 1. Method Guard
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // 2. Security: Validate QStash Signature
    // This prevents unauthorized invocation of this heavy worker
    const signatureValidator = new QStashSignatureValidator();
    const isVerified = await signatureValidator.verify(req);

    if (!isVerified) {
      logger.warn('[ProcessEvent] Signature Verification Failed');
      return new Response('Unauthorized', { status: 401 });
    }

    // 3. Bootstrap Infrastructure
    const bootstrap = GlobalBootstrap.getInstance();
    await bootstrap.initialize();

    // 4. Parse Payload
    // The payload is expected to be an InternalEvent envelope
    const event: InternalEvent = await req.json();

    if (!event || !event.eventId || !event.type) {
      logger.warn('[ProcessEvent] Invalid Event Payload', { event });
      return new Response('Bad Request', { status: 400 });
    }

    // 5. Resolve Dependencies
    const clickHouseClient = bootstrap.getClickHouseClient();
    const prismaClient = bootstrap.getPrismaClient();

    const clickHouseRepo = new ClickHouseRepository(clickHouseClient);
    // Postgres repo often handles idempotency checks or status updates
    const idempotencyRepo = new PostgresSyncRepository(prismaClient);
    
    // Vector Search Components
    const pineconeRepo = new PineconeRepository(
      ServiceConfig.pinecone.apiKey,
      ServiceConfig.pinecone.environment,
      ServiceConfig.pinecone.indexName
    );
    
    const openAIGateway = new OpenAIGateway(
      ServiceConfig.openai.apiKey,
      ServiceConfig.openai.embeddingModel
    );

    // Domain Service
    const transformService = new TransformationService();

    // 6. Instantiate Use Case
    const processCDCUseCase = new ProcessCDCEventUseCase(
      clickHouseRepo,
      pineconeRepo,
      openAIGateway,
      transformService,
      idempotencyRepo, // Implements IRedisIdempotency or generic state tracking
      logger
    );

    // 7. Execute Business Logic
    await processCDCUseCase.execute(event);

    // 8. Success Response (Acknowledges QStash)
    return new Response(JSON.stringify({ status: 'processed', eventId: event.eventId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    logger.error('[ProcessEvent] Processing Failure', error);

    // Return 500 to trigger QStash retry policy (Exponential Backoff)
    // If it's a known non-retryable error, catch specific types and return 200 with error log
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}