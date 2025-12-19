/**
 * Interface definition for interacting with the OpenAI LLM service.
 * Abstraction layer to decouple domain logic from specific SDK implementations.
 */
export interface IOpenAIGateway {
  /**
   * Generates a vector embedding for the provided text.
   * @param text The input text to embed.
   * @returns A promise resolving to the embedding vector (array of numbers).
   * @throws Error if the API call fails or limits are exceeded.
   */
  createEmbedding(text: string): Promise<number[]>;

  /**
   * Generates a text completion based on the provided prompt using the LLM.
   * @param prompt The constructed prompt containing instructions and context.
   * @returns A promise resolving to the generated text response.
   * @throws Error if the API call fails.
   */
  getCompletion(prompt: string): Promise<string>;
}