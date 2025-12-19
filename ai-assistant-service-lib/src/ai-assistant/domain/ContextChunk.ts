/**
 * Domain Value Object representing a retrieved piece of textual context 
 * from the knowledge base (Vector DB), used to augment the LLM prompt.
 */
export class ContextChunk {
  /**
   * The actual text content retrieved.
   */
  public readonly content: string;

  /**
   * The relevance score of this chunk to the query (e.g., cosine similarity).
   * Usually between 0 and 1.
   */
  public readonly relevanceScore: number;

  /**
   * Identifier of the source document or record (e.g., order ID, product ID).
   */
  public readonly sourceId: string;

  /**
   * Additional metadata associated with the chunk (e.g., timestamps, entity types).
   */
  public readonly metadata: Record<string, unknown>;

  /**
   * Creates a new ContextChunk.
   * 
   * @param content - The text content.
   * @param sourceId - The ID of the source data.
   * @param relevanceScore - The similarity score.
   * @param metadata - Optional metadata.
   */
  constructor(
    content: string,
    sourceId: string,
    relevanceScore: number,
    metadata: Record<string, unknown> = {}
  ) {
    if (!content || content.trim().length === 0) {
      throw new Error('Context chunk content cannot be empty.');
    }

    if (!sourceId || sourceId.trim().length === 0) {
      throw new Error('Context chunk source ID is required.');
    }

    this.content = content;
    this.sourceId = sourceId;
    this.relevanceScore = relevanceScore;
    this.metadata = metadata;
  }

  /**
   * Creates a truncated version of the chunk content to fit within token limits.
   * Note: This uses character length as a proxy for token count.
   * 
   * @param maxCharacters - The maximum number of characters allowed.
   * @returns A new string with the truncated content.
   */
  public getTruncatedContent(maxCharacters: number): string {
    if (this.content.length <= maxCharacters) {
      return this.content;
    }
    return this.content.substring(0, maxCharacters) + '...';
  }

  /**
   * Checks if the chunk meets a minimum relevance threshold.
   * 
   * @param threshold - The minimum score required (0-1).
   */
  public isRelevant(threshold: number): boolean {
    return this.relevanceScore >= threshold;
  }

  /**
   * Serializes the chunk for inclusion in debug logs or API responses.
   */
  public toJSON(): object {
    return {
      sourceId: this.sourceId,
      relevanceScore: this.relevanceScore,
      contentPreview: this.getTruncatedContent(50),
      metadata: this.metadata
    };
  }
}