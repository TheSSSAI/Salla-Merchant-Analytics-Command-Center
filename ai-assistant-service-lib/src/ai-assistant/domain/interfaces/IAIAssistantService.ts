import { NaturalLanguageQueryRequest } from '../../application/dtos/NaturalLanguageQueryRequest';
import { AIQueryResponse } from '../../application/dtos/AIQueryResponse';
import { Insight } from '../Insight';

/**
 * Primary Service Interface for the AI Assistant Module.
 * Defines the high-level operations exposed to the application layer (e.g., BFF/API).
 */
export interface IAIAssistantService {
  /**
   * Processes a natural language query from a user using RAG.
   * 
   * @param request The request object containing the query and user context (merchantId).
   * @returns A structured response containing the answer and optional visualization data.
   */
  processQuery(request: NaturalLanguageQueryRequest): Promise<AIQueryResponse>;

  /**
   * Triggers the proactive generation of business insights for a specific merchant.
   * Typically called by a scheduled job.
   * 
   * @param merchantId The identifier of the merchant to analyze.
   * @returns A list of generated insights (Trends, Anomalies).
   */
  generateInsights(merchantId: string): Promise<Insight[]>;

  /**
   * Generates actionable optimization suggestions based on data patterns.
   * 
   * @param merchantId The identifier of the merchant.
   * @returns A list of suggestions (e.g., "Review pricing for Product X").
   */
  generateSuggestions(merchantId: string): Promise<Insight[]>;
}