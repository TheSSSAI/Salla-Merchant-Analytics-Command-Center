import { Insight } from '../../domain/Insight';

/**
 * Strategy interface for defining specific data analysis rules.
 * Implementations of this interface define the logic for detecting specific patterns
 * (e.g., Sales Spikes, High Abandonment, Low Conversion).
 */
export interface IInsightRule {
  /**
   * Unique identifier for the rule.
   */
  readonly ruleId: string;

  /**
   * Evaluates the provided dataset to determine if an insight should be generated.
   * 
   * @param merchantId The merchant context for the evaluation.
   * @param data The dataset (usually fetched via IAnalyticsDataRepository) to analyze.
   * @returns A Promise resolving to an Insight object if the rule triggers, or null if not.
   */
  evaluate(merchantId: string, data: any): Promise<Insight | null>;
}