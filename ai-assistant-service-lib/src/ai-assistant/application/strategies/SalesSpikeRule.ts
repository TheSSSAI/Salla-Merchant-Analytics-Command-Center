import { IInsightRule } from './IInsightRule';
import { InsightResult } from '../dtos/InsightResult';
import { InsightType } from '../../domain/Insight';

interface SalesDataPoint {
  date: Date;
  value: number;
}

interface SalesAnalysisContext {
  currentPeriodTotal: number;
  previousPeriodAverage: number;
  timeframeDescription: string; // e.g., "this week", "today"
}

export class SalesSpikeRule implements IInsightRule {
  private readonly SPIKE_THRESHOLD_PERCENTAGE = 30; // 30% increase triggers an insight

  /**
   * Evaluates sales data to detect significant positive trends (spikes).
   * @param data SalesAnalysisContext containing current vs historical data
   */
  public async evaluate(data: any): Promise<InsightResult | null> {
    const context = data as SalesAnalysisContext;

    // Validation
    if (
      typeof context.currentPeriodTotal !== 'number' || 
      typeof context.previousPeriodAverage !== 'number' ||
      context.previousPeriodAverage === 0
    ) {
      return null;
    }

    const difference = context.currentPeriodTotal - context.previousPeriodAverage;
    const percentageChange = (difference / context.previousPeriodAverage) * 100;

    // Check if the positive change exceeds the threshold
    if (percentageChange >= this.SPIKE_THRESHOLD_PERCENTAGE) {
      return new InsightResult(
        InsightType.TREND,
        `Significant Sales Increase`,
        `Sales are up ${percentageChange.toFixed(1)}% ${context.timeframeDescription} compared to your historical average. Total sales: ${context.currentPeriodTotal.toFixed(2)}.`,
        {
          metric: 'sales_revenue',
          percentageChange: percentageChange,
          currentValue: context.currentPeriodTotal,
          historicalAverage: context.previousPeriodAverage
        }
      );
    }

    return null;
  }
}