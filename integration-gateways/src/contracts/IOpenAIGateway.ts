import { GatewayResult } from '../models/GatewayResult';

/**
 * Contract for the OpenAI Gateway.
 * Abstracts interactions with Large Language Models (LLM) and Embedding services.
 */
export interface IOpenAIGateway {
  /**
   * Generates a text completion based on the user prompt and optional system context (RAG).
   * Implementations must handle PII scrubbing before sending data.
   * 
   * @param prompt - The user's query or instruction.
   * @param context - Optional retrieved context (RAG) to be injected as system instructions.
   * @returns A Promise resolving to a GatewayResult containing the generated text.
   */
  generateCompletion(prompt: string, context?: string): Promise<GatewayResult<string>>;

  /**
   * Generates a vector embedding for the provided text.
   * Used for indexing content in the Vector Database.
   * 
   * @param text - The text to embed.
   * @returns A Promise resolving to a GatewayResult containing the embedding vector (array of numbers).
   */
  generateEmbedding(text: string): Promise<GatewayResult<number[]>>;
}