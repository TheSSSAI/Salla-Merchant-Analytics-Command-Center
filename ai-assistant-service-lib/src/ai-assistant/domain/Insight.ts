/**
 * Enum defining the category of an automated insight.
 */
export enum InsightType {
  TREND = 'TREND',         // Significant movement in a metric (e.g., Sales up 20%)
  ANOMALY = 'ANOMALY',     // Unexpected data point (e.g., Sudden spike in abandoned carts)
  SUGGESTION = 'SUGGESTION' // Actionable advice (e.g., Optimize product description)
}

/**
 * Enum defining the severity or importance of the insight.
 */
export enum InsightSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL'
}

/**
 * Domain Entity representing a generated insight or alert.
 */
export class Insight {
  constructor(
    public readonly type: InsightType,
    public readonly title: string,
    public readonly description: string,
    public readonly merchantId: string,
    public readonly severity: InsightSeverity = InsightSeverity.INFO,
    public readonly timestamp: Date = new Date(),
    public readonly metadata?: Record<string, any>
  ) {
    if (!title || !description) {
      throw new Error("Insight must have a title and description.");
    }
    if (!merchantId) {
      throw new Error("Insight must be associated with a merchant.");
    }
  }
}