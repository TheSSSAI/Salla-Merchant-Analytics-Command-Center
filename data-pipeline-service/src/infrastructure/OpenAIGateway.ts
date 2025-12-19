import { GlobalBootstrap } from './GlobalBootstrap';
import OpenAI from 'openai';
import { ServiceConfig } from '../config/ServiceConfig';

/**
 * OpenAIGateway
 * 
 * Adapter for OpenAI API interactions.
 * Primarily used for generating text embeddings for the RAG pipeline.
 */
export class OpenAIGateway {
  private client: OpenAI;
  private model: string;

  constructor() {
    this.client = GlobalBootstrap.getInstance().openai;
    this.model = 'text-embedding-3-small'; // Efficient, low-latency model
  }

  /**
   * Generates a vector embedding for the given text.
   * 
   * @param text The input text to embed
   * @returns Array of numbers representing the embedding
   */
  public async generateEmbedding(text: string): Promise<number[]> {
    if (!text || text.trim().length === 0) {
      throw new Error('Input text cannot be empty for embedding generation');
    }

    try {
      // Remove newlines to improve embedding performance as recommended by OpenAI
      const sanitizedText = text.replace(/\n/g, ' ');

      const response = await this.client.embeddings.create({
        model: this.model,
        input: sanitizedText,
        encoding_format: 'float',
      });

      if (!response.data || response.data.length === 0) {
        throw new Error('OpenAI API returned empty embedding data');
      }

      return response.data[0].embedding;
    } catch (error) {
      console.error('OpenAI Embedding Error:', error);
      // Basic handling for Rate Limits
      if ((error as any).status === 429) {
        // In a real production system, we might implement a delay and retry here
        // or throw a specific error type to let QStash handle the backoff
        throw new Error('OpenAI Rate Limit Exceeded');
      }
      throw new Error(`Failed to generate embedding: ${(error as Error).message}`);
    }
  }

  /**
   * Generates embeddings for a batch of texts.
   * 
   * @param texts Array of strings
   * @returns Array of embedding arrays
   */
  public async generateEmbeddingsBatch(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) return [];

    try {
      const sanitizedTexts = texts.map(t => t.replace(/\n/g, ' '));

      const response = await this.client.embeddings.create({
        model: this.model,
        input: sanitizedTexts,
        encoding_format: 'float',
      });

      // Ensure mapping maintains order
      return response.data.map(item => item.embedding);
    } catch (error) {
      console.error('OpenAI Batch Embedding Error:', error);
      throw new Error(`Failed to generate batch embeddings: ${(error as Error).message}`);
    }
  }
}