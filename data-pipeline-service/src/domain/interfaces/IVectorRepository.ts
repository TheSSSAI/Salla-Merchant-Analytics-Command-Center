/**
 * Interface for Vector Database operations supporting the RAG pattern.
 * This abstraction allows swapping between Pinecone, Milvus, or pgvector.
 */
export interface IVectorRepository {
  /**
   * Upserts a vector embedding associated with a specific domain entity.
   * @param id Unique identifier for the vector (e.g., "product_123").
   * @param values The high-dimensional vector array.
   * @param metadata Contextual metadata for retrieval filtering (merchantId, text content, etc.).
   */
  upsertVector(id: string, values: number[], metadata: Record<string, any>): Promise<void>;

  /**
   * Batch upserts multiple vectors for bulk processing efficiency.
   * @param vectors Array of vector objects containing id, values, and metadata.
   */
  upsertBatch(vectors: Array<{ id: string; values: number[]; metadata: Record<string, any> }>): Promise<void>;

  /**
   * Deletes vectors associated with a specific merchant or entity.
   * Essential for DSAR (Data Subject Access Requests) compliance.
   * @param filter Key-value pair to filter vectors for deletion (e.g., { merchantId: "xyz" }).
   */
  deleteByFilter(filter: Record<string, any>): Promise<void>;
}