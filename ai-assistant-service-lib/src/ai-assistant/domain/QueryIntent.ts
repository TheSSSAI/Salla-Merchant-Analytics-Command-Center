/**
 * Defines the classification of a user's natural language query.
 */
export enum QueryIntentType {
  /**
   * Queries requesting specific metrics, aggregations, or data visualization.
   * e.g., "What were my sales last week?"
   */
  ANALYTICS = 'ANALYTICS',

  /**
   * Queries asking for specific records or details about an entity.
   * e.g., "Show me order #1234."
   */
  LOOKUP = 'LOOKUP',

  /**
   * Queries that are outside the scope of the system's data or capabilities.
   * e.g., "What is the weather?"
   */
  OUT_OF_SCOPE = 'OUT_OF_SCOPE',

  /**
   * Queries that are unintelligible or malformed.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Domain Value Object representing the interpreted intent of a user's natural language query.
 * This encapsulates the analysis of what the user wants to achieve.
 */
export class QueryIntent {
  /**
   * The original raw query text provided by the user.
   */
  public readonly originalQuery: string;

  /**
   * The classified type of the intent.
   */
  public readonly type: QueryIntentType;

  /**
   * Extracted entities and parameters from the query (e.g., date ranges, product names).
   */
  public readonly entities: Record<string, any>;

  /**
   * The confidence score of the intent classification (0.0 to 1.0).
   */
  public readonly confidence: number;

  /**
   * Creates a new QueryIntent value object.
   * 
   * @param originalQuery - The user's input text.
   * @param type - The determined intent type.
   * @param confidence - Confidence level of classification.
   * @param entities - Extracted structured data.
   */
  constructor(
    originalQuery: string,
    type: QueryIntentType,
    confidence: number,
    entities: Record<string, any> = {}
  ) {
    if (!originalQuery || originalQuery.trim().length === 0) {
      throw new Error('Original query text is required.');
    }
    
    if (confidence < 0 || confidence > 1) {
      throw new Error('Confidence must be between 0.0 and 1.0.');
    }

    this.originalQuery = originalQuery;
    this.type = type;
    this.confidence = confidence;
    this.entities = entities;
  }

  /**
   * Checks if the query represents a request for analytics data.
   */
  public isAnalyticsRequest(): boolean {
    return this.type === QueryIntentType.ANALYTICS;
  }

  /**
   * Checks if the system determines this query can likely be answered.
   * Returns false for OUT_OF_SCOPE or UNKNOWN types.
   */
  public isValidRequest(): boolean {
    return (
      this.type !== QueryIntentType.OUT_OF_SCOPE &&
      this.type !== QueryIntentType.UNKNOWN
    );
  }

  /**
   * Retrieves a specific extracted entity if it exists.
   * 
   * @param key - The entity key (e.g., 'dateRange').
   * @returns The entity value or undefined.
   */
  public getEntity<T>(key: string): T | undefined {
    return this.entities[key] as T;
  }

  /**
   * Creates an instance representing an unknown intent.
   */
  public static unknown(query: string): QueryIntent {
    return new QueryIntent(query, QueryIntentType.UNKNOWN, 0.0);
  }

  /**
   * Creates an instance representing an out-of-scope intent.
   */
  public static outOfScope(query: string): QueryIntent {
    return new QueryIntent(query, QueryIntentType.OUT_OF_SCOPE, 1.0);
  }
}