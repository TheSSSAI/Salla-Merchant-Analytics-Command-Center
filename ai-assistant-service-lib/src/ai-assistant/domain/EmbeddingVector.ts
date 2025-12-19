/**
 * Domain Value Object representing a mathematical vector embedding of text.
 * Used for semantic similarity search and comparison.
 */
export class EmbeddingVector {
  /**
   * The numerical values of the vector.
   */
  private readonly values: number[];

  /**
   * Creates a new EmbeddingVector.
   * 
   * @param values - An array of numbers representing the embedding.
   * @throws Error if the values array is empty or contains non-finite numbers.
   */
  constructor(values: number[]) {
    if (!values || values.length === 0) {
      throw new Error('Embedding vector cannot be empty.');
    }

    if (!values.every(v => Number.isFinite(v))) {
      throw new Error('Embedding vector contains invalid numerical values.');
    }

    // Store as immutable
    this.values = [...values];
  }

  /**
   * Calculates the Cosine Similarity between this vector and another.
   * Cosine Similarity = (A . B) / (||A|| * ||B||)
   * 
   * @param other - The vector to compare against.
   * @returns A score between -1.0 and 1.0 (typically 0-1 for text embeddings), 
   * where 1.0 indicates identical direction.
   * @throws Error if vector dimensions do not match.
   */
  public cosineSimilarity(other: EmbeddingVector): number {
    if (this.values.length !== other.values.length) {
      throw new Error(
        `Dimension mismatch: Cannot compare vector of size ${this.values.length} with ${other.values.length}.`
      );
    }

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < this.values.length; i++) {
      const valA = this.values[i];
      const valB = other.values[i];

      dotProduct += valA * valB;
      magnitudeA += valA * valA;
      magnitudeB += valB * valB;
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0;
    }

    return dotProduct / (magnitudeA * magnitudeB);
  }

  /**
   * Returns the number of dimensions in the vector.
   */
  public dimensions(): number {
    return this.values.length;
  }

  /**
   * Returns a copy of the raw vector values.
   */
  public toArray(): number[] {
    return [...this.values];
  }

  /**
   * Checks for equality with another vector.
   */
  public equals(other: EmbeddingVector): boolean {
    if (this.values.length !== other.values.length) return false;
    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i] !== other.values[i]) return false;
    }
    return true;
  }
}