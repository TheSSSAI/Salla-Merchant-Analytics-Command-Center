import { IAIAssistantService } from '../../domain/interfaces/IAIAssistantService';
import { NaturalLanguageQueryRequest } from '../dtos/NaturalLanguageQueryRequest';
import { AIQueryResponse, QueryStatus } from '../dtos/AIQueryResponse';
import { InsightResult } from '../dtos/InsightResult';
import { RagOrchestrator } from './RagOrchestrator';
import { InsightGeneratorService } from './InsightGeneratorService';

/**
 * Service Implementation: AIAssistantService
 * 
 * Acts as the primary facade/application service for the AI Assistant library.
 * It orchestrates user interactions via the RAG pipeline and manages the generation
 * of proactive insights by coordinating specialized domain services.
 * 
 * Dependency Level: 4
 */
export class AIAssistantService implements IAIAssistantService {
    private readonly _ragOrchestrator: RagOrchestrator;
    private readonly _insightGenerator: InsightGeneratorService;

    /**
     * Initializes a new instance of the AIAssistantService.
     * 
     * @param ragOrchestrator - Service responsible for the Retrieval-Augmented Generation pipeline.
     * @param insightGenerator - Service responsible for analyzing data and generating insights.
     */
    constructor(
        ragOrchestrator: RagOrchestrator,
        insightGenerator: InsightGeneratorService
    ) {
        if (!ragOrchestrator) {
            throw new Error('RagOrchestrator dependency is required.');
        }
        if (!insightGenerator) {
            throw new Error('InsightGeneratorService dependency is required.');
        }

        this._ragOrchestrator = ragOrchestrator;
        this._insightGenerator = insightGenerator;
    }

    /**
     * Processes a natural language query from a user using the RAG pattern.
     * 
     * This method validates the request, orchestrates the retrieval of relevant context,
     * constructs a prompt, and obtains a response from the LLM via the RagOrchestrator.
     * It maps the result or any errors into a standardized AIQueryResponse.
     * 
     * @param request - The DTO containing the user's query and merchant context.
     * @returns A Promise resolving to a structured AIQueryResponse.
     */
    public async processQuery(request: NaturalLanguageQueryRequest): Promise<AIQueryResponse> {
        try {
            // 1. Input Validation
            this.validateQueryRequest(request);

            // 2. Execution Delegation
            // The RagOrchestrator handles PII sanitization, Vector Search, and Prompt Engineering internally.
            const rawAnswer = await this._ragOrchestrator.performRagPipeline(
                request.query,
                request.merchantId
            );

            // 3. Response Construction
            // If the answer is empty or null, we treat it as a data availability issue.
            if (!rawAnswer || rawAnswer.trim().length === 0) {
                return {
                    answer: "I'm sorry, I couldn't find enough relevant data to answer your question.",
                    status: QueryStatus.NoData
                };
            }

            return {
                answer: rawAnswer,
                status: QueryStatus.Success
            };

        } catch (error: any) {
            // 4. Error Handling
            // In a production environment, this should log to a centralized observability platform (e.g., Axiom/Datadog)
            console.error(`[AIAssistantService] Error processing query for merchant ${request?.merchantId}:`, error);

            // Return a graceful error response to the client
            return {
                answer: "An error occurred while processing your request. Please try again later.",
                status: QueryStatus.Error
            };
        }
    }

    /**
     * Triggers the proactive analysis of a merchant's data to generate insights.
     * 
     * This method delegates to the InsightGeneratorService to run configured strategies
     * (rules) against the merchant's data. It is typically invoked by background jobs
     * or scheduled tasks.
     * 
     * @param merchantId - The unique identifier of the merchant to analyze.
     * @returns A Promise resolving to a list of generated insights (Trends, Anomalies, Suggestions).
     */
    public async generateProactiveInsights(merchantId: string): Promise<InsightResult[]> {
        try {
            // 1. Input Validation
            if (!merchantId || merchantId.trim().length === 0) {
                throw new Error('Merchant ID is required for insight generation.');
            }

            // 2. Execution Delegation
            // The generator service fetches data and executes all registered Insight Rules.
            const insights = await this._insightGenerator.analyzeMerchantData(merchantId);

            return insights;

        } catch (error: any) {
            // 3. Error Handling
            // We log the error but return an empty array to prevent a background job failure from crashing the process.
            console.error(`[AIAssistantService] Error generating insights for merchant ${merchantId}:`, error);
            
            // Return empty array to indicate no new insights could be generated during this run
            return [];
        }
    }

    /**
     * Validates the incoming query request object.
     * 
     * @param request - The request DTO to validate.
     * @throws Error if validation fails.
     */
    private validateQueryRequest(request: NaturalLanguageQueryRequest): void {
        if (!request) {
            throw new Error('Request object cannot be null or undefined.');
        }

        if (!request.merchantId || request.merchantId.trim().length === 0) {
            throw new Error('Merchant ID is required to process the query.');
        }

        if (!request.query || request.query.trim().length === 0) {
            throw new Error('Query text cannot be empty.');
        }

        // Additional validation could go here (e.g., max query length)
        if (request.query.length > 1000) {
            throw new Error('Query text exceeds maximum allowed length.');
        }
    }
}