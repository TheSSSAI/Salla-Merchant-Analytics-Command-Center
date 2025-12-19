import { IOpenAIGateway } from '../../domain/interfaces/IOpenAIGateway';
import { IVectorDbRepository } from '../../domain/interfaces/IVectorDbRepository';
import { PiiSanitizationService } from './PiiSanitizationService';
import { PromptEngineeringService } from './PromptEngineeringService';

/**
 * Orchestrates the Retrieval-Augmented Generation (RAG) pipeline.
 * Coordinates between PII sanitization, Vector Search, Prompt Engineering, and LLM interaction.
 * 
 * Dependency Level: 3
 */
export class RagOrchestrator {
  private readonly _openAiGateway: IOpenAIGateway;
  private readonly _vectorRepo: IVectorDbRepository;
  private readonly _promptService: PromptEngineeringService;
  private readonly _piiService: PiiSanitizationService;

  // Configuration constants
  private static readonly VECTOR_SEARCH_LIMIT = 5;
  private static readonly MIN_CONTEXT_THRESHOLD = 0; // Can be adjusted if we want to enforce minimum relevance

  constructor(
    openAiGateway: IOpenAIGateway,
    vectorRepo: IVectorDbRepository,
    promptService: PromptEngineeringService,
    piiService: PiiSanitizationService
  ) {
    if (!openAiGateway) throw new Error('IOpenAIGateway is required');
    if (!vectorRepo) throw new Error('IVectorDbRepository is required');
    if (!promptService) throw new Error('PromptEngineeringService is required');
    if (!piiService) throw new Error('PiiSanitizationService is required');

    this._openAiGateway = openAiGateway;
    this._vectorRepo = vectorRepo;
    this._promptService = promptService;
    this._piiService = piiService;
  }

  /**
   * Executes the full RAG pipeline for a given user query.
   * 
   * @param query - The raw natural language query from the user.
   * @param merchantId - The unique identifier for the merchant to scope data access.
   * @returns The generated response from the LLM based on retrieved context.
   * @throws Error if the pipeline fails at any critical stage.
   */
  public async performRagPipeline(query: string, merchantId: string): Promise<string> {
    this.validateInputs(query, merchantId);

    try {
      // Step 1: Sanitize Input
      // We sanitize before embedding to prevent PII from leaking into the embedding vector 
      // or being sent to the vector database logs.
      const sanitizedQuery = this._piiService.sanitize(query);

      // Step 2: Generate Embedding
      // Convert the text query into a vector representation.
      const embedding = await this._openAiGateway.createEmbedding(sanitizedQuery);

      if (!embedding || embedding.length === 0) {
        throw new Error('Failed to generate embedding for the query.');
      }

      // Step 3: Vector Search (Retrieval)
      // Retrieve relevant context chunks strictly scoped to the merchantId.
      const contextChunks = await this._vectorRepo.findRelevantContext(
        embedding,
        merchantId
      );

      // Step 4: Prompt Construction
      // The PromptEngineeringService handles token limits and prompt structure.
      const finalPrompt = this._promptService.constructPrompt(
        sanitizedQuery,
        contextChunks
      );

      // Step 5: LLM Completion (Generation)
      // Send the augmented prompt to the LLM.
      const response = await this._openAiGateway.getCompletion(finalPrompt);

      // Step 6: Post-processing (Optional)
      // Additional sanitization on the output could happen here if strict DLP is required.
      
      return response;

    } catch (error: unknown) {
      // Log error internally here if a logger was available
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`RAG Pipeline failed: ${errorMessage}`);
    }
  }

  /**
   * Validates input parameters to ensure system integrity.
   */
  private validateInputs(query: string, merchantId: string): void {
    if (!query || query.trim().length === 0) {
      throw new Error('Query cannot be empty.');
    }
    if (!merchantId || merchantId.trim().length === 0) {
      throw new Error('Merchant ID is required for data scoping.');
    }
  }
}