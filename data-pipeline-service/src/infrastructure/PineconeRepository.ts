import { IVectorRepository } from '../domain/interfaces/IVectorRepository';
import { GlobalBootstrap } from './GlobalBootstrap';
import { Pinecone, Index } from '@pinecone-database/pinecone';
import { ServiceConfig } from '../config/ServiceConfig';

/**
 * PineconeRepository
 * 
 * Implementation of Vector Storage for RAG (Retrieval Augmented Generation).
 * Stores embeddings of product and order data to enable AI query context.
 */
export class PineconeRepository implements IVectorRepository {
  private client: Pinecone;
  private indexName: string;

  constructor() {
    this.client = GlobalBootstrap.getInstance().pinecone;
    this.indexName = ServiceConfig.pineconeIndex;
  }

  private getIndex(): Index {
    return this.client.index(this.indexName);
  }

  /**
   * Upserts vector embeddings with metadata.
   * 
   * @param vectors Array of objects containing id, values (embedding), and metadata
   */
  public async upsertVectors(
    vectors: { id: string; values: number[]; metadata: Record<string, any> }[]
  ): Promise<void> {
    if (vectors.length === 0) return;

    try {
      const index = this.getIndex();
      
      // Pinecone recommends batches of ~100-500 depending on size
      // We assume the caller or this method handles reasonable batch sizes.
      // Here we implement a simple chunking just in case.
      const batchSize = 100;
      for (let i = 0; i < vectors.length; i += batchSize) {
        const batch = vectors.slice(i, i + batchSize);
        await index.upsert(batch);
      }
    } catch (error) {
      console.error('Pinecone Upsert Error:', error);
      throw new Error(`Failed to upsert vectors: ${(error as Error).message}`);
    }
  }

  /**
   * Queries the vector database for similar items.
   * 
   * @param vector The query embedding
   * @param topK Number of results to return
   * @param filter Optional metadata filter (e.g., scoping by merchantId)
   */
  public async queryVectors(
    vector: number[],
    topK: number,
    filter?: Record<string, any>
  ): Promise<any[]> {
    try {
      const index = this.getIndex();
      
      const queryRequest: any = {
        vector,
        topK,
        includeMetadata: true,
      };

      if (filter) {
        queryRequest.filter = filter;
      }

      const result = await index.query(queryRequest);
      return result.matches || [];
    } catch (error) {
      console.error('Pinecone Query Error:', error);
      throw new Error(`Failed to query vectors: ${(error as Error).message}`);
    }
  }

  /**
   * Deletes vectors by ID.
   * Used when data is erased (GDPR) or updated significantly.
   */
  public async deleteVectors(ids: string[]): Promise<void> {
    if (ids.length === 0) return;
    try {
      const index = this.getIndex();
      await index.deleteMany(ids);
    } catch (error) {
      console.error('Pinecone Delete Error:', error);
      throw new Error(`Failed to delete vectors: ${(error as Error).message}`);
    }
  }
}