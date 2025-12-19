import { IAnalyticsDataRepository } from '../../domain/interfaces/IAnalyticsDataRepository';
import { IInsightRule } from '../strategies/IInsightRule';
import { InsightResult } from '../dtos/InsightResult';
import { InsightType } from '../../domain/Insight';

/**
 * Service responsible for proactively analyzing merchant data to generate insights.
 * Uses a Strategy pattern to apply various analysis rules (Trends, Anomalies, Suggestions).
 * 
 * Dependency Level: 3
 */
export class InsightGeneratorService {
  private readonly _analyticsRepo: IAnalyticsDataRepository;
  private readonly _rules: IInsightRule[];

  // Default analysis period in days
  private static readonly ANALYSIS_PERIOD_DAYS = 30;

  constructor(
    analyticsRepo: IAnalyticsDataRepository,
    rules: IInsightRule[]
  ) {
    if (!analyticsRepo) throw new Error('IAnalyticsDataRepository is required');
    if (!rules || rules.length === 0) {
      // We allow initialization with empty rules, but warn or throw depending on strictness.
      // For this implementation, we ensure rules are provided to be useful.
      throw new Error('At least one IInsightRule strategy is required');
    }

    this._analyticsRepo = analyticsRepo;
    this._rules = rules;
  }

  /**
   * Analyzes data for a specific merchant and generates a list of insights.
   * This method fetches the necessary data aggregation and runs all configured strategies against it.
   * 
   * @param merchantId - The unique identifier of the merchant.
   * @returns A promise resolving to a list of generated insights.
   */
  public async analyzeMerchantData(merchantId: string): Promise<InsightResult[]> {
    if (!merchantId) {
      throw new Error('Merchant ID is required for analysis.');
    }

    try {
      // 1. Prepare the Data Context
      // Fetch the standard analytical dataset required by most rules. 
      // This minimizes database load by fetching common data once.
      // Note: DateRange type is assumed to be part of the IAnalyticsDataRepository contract scope.
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - InsightGeneratorService.ANALYSIS_PERIOD_DAYS);

      const salesMetrics = await this._analyticsRepo.getSalesMetrics(merchantId, {
        startDate,
        endDate
      });

      if (!salesMetrics) {
        // If no data is returned, we cannot generate insights.
        return [];
      }

      // 2. Execute Strategies
      // Run all rules in parallel to optimize performance.
      const rulePromises = this._rules.map(async (rule) => {
        try {
          return await rule.evaluate(salesMetrics);
        } catch (ruleError) {
          // Individual rule failures should not crash the entire generation process.
          // We assume a logger would capture this in a real environment.
          // console.error(`Rule ${rule.constructor.name} failed:`, ruleError);
          return null;
        }
      });

      const results = await Promise.all(rulePromises);

      // 3. Aggregate and Filter Results
      const insights: InsightResult[] = results
        .filter((result): result is InsightResult => result !== null) // Filter out nulls (failures or no-insight)
        .map(result => this.enrichInsightMetadata(result, merchantId));

      return insights;

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to generate insights for merchant ${merchantId}: ${errorMessage}`);
    }
  }

  /**
   * Adds generic metadata or standardizes formatting for insights before returning.
   * Useful for auditing or standardized UI rendering.
   */
  private enrichInsightMetadata(insight: InsightResult, merchantId: string): InsightResult {
    // This method allows for centralized modification of insights if needed.
    // For now, it passes the insight through, but could attach timestamps or source tracking.
    
    // Ensure the message is properly trimmed
    if (insight.message) {
        insight.message = insight.message.trim();
    }

    return insight;
  }
}