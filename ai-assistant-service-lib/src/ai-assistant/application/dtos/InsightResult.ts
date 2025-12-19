import { InsightType } from '../../domain/Insight';

/**
 * Data Transfer Object representing the result of an insight analysis rule execution.
 * Encapsulates the identified insight, its classification, and supporting data.
 */
export class InsightResult {
  /**
   * The categorization of the insight (e.g., Trend, Anomaly).
   */
  public readonly type: InsightType;

  /**
   * A human-readable description of the finding.
   */
  public readonly message: string;

  /**
   * The confidence score of the insight, typically between 0.0 and 1.0.
   */
  public readonly confidence: number;

  /**
   * Additional contextual data supporting the insight (e.g., specific metric values, percentage changes).
   */
  public readonly metadata: Record<string, unknown>;

  /**
   * The timestamp when this result was generated.
   */
  public readonly generatedAt: Date;

  /**
   * Creates a new instance of InsightResult.
   * 
   * @param type - The classification of the insight.
   * @param message - The descriptive message.
   * @param confidence - Statistical confidence level (defaults to 1.0 if not provided).
   * @param metadata - Supporting data (defaults to empty object).
   * @throws Error if message is empty or confidence is out of bounds.
   */
  constructor(
    type: InsightType,
    message: string,
    confidence: number = 1.0,
    metadata: Record<string, unknown> = {}
  ) {
    this.validateInput(message, confidence);

    this.type = type;
    this.message = message;
    this.confidence = confidence;
    this.metadata = metadata;
    this.generatedAt = new Date();
  }

  /**
   * Validates constructor inputs to ensure data integrity.
   */
  private validateInput(message: string, confidence: number): void {
    if (!message || message.trim().length === 0) {
      throw new Error('InsightResult message cannot be empty.');
    }

    if (confidence < 0 || confidence > 1) {
      throw new Error(`InsightResult confidence must be between 0.0 and 1.0. Received: ${confidence}`);
    }
  }

  /**
   * Creates a generic "No Insight" result, useful for rules that find no significant patterns.
   * 
   * @returns An InsightResult representing no findings.
   */
  public static createEmpty(): InsightResult | null {
    return null; 
  }

  /**
   * Serializes the DTO to a plain JSON object.
   */
  public toJSON(): object {
    return {
      type: this.type,
      message: this.message,
      confidence: this.confidence,
      metadata: this.metadata,
      generatedAt: this.generatedAt.toISOString(),
    };
  }
}