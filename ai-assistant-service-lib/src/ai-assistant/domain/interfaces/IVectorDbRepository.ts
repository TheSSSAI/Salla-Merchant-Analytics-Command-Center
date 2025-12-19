/**
 * Interface for Vector Database operations required for RAG.
 * Handles the storage and retrieval of semantic embeddings.
 */
export interface IVectorDbRepository {
  /**
   * Finds semantically relevant context chunks for a given query embedding.
   * Scoped to a specific merchant to ensure data isolation.
   * 
   * @param embedding The vector representation of the user's query.
   * @param merchantId The unique identifier of the merchant (tenant scope).
   * @param limit The maximum number of context chunks to retrieve.
   * @returns A promise resolving to an array of text chunks derived from merchant data.
   */
  findRelevantContext(embedding: number[], merchantId: string, limit?: number): Promise<string[]>;

  /**
   * Stores or updates an embedding vector for a specific piece of merchant data.
   * 
   * @param id Unique identifier for the data record.
   * @param text The raw text content.
   * @param embedding The vector representation of the text.
   * @param merchantId The tenant owner of this data.
   * @param metadata Optional additional key-value pairs for filtering.
   */
  upsertEmbedding(id: string, text: string, embedding: number[], merchantId: string, metadata?: Record<string, any>): Promise<void>;
}