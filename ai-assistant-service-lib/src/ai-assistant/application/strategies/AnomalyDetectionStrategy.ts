import { IInsightRule } from './IInsightRule';
import { InsightResult } from '../dtos/InsightResult';
import { InsightType } from '../../domain/Insight';

interface MetricTimeSeries {
  metricName: string; // e.g., "abandoned_carts", "api_errors"
  dataPoints: number[]; // Array of values ordered by time
}

export class AnomalyDetectionStrategy implements IInsightRule {
  private readonly Z_SCORE_THRESHOLD = 3.0; // Standard deviations to consider an anomaly
  private readonly MIN_DATA_POINTS = 7; // Minimum points required for statistical significance

  /**
   * Uses Z-Score analysis to detect anomalies in a time series.
   * Detects if the most recent data point is statistically significantly different from the recent history.
   * @param data MetricTimeSeries object
   */
  public async evaluate(data: any): Promise<InsightResult | null> {
    const timeSeries = data as MetricTimeSeries;

    if (!timeSeries.dataPoints || timeSeries.dataPoints.length < this.MIN_DATA_POINTS) {
      return null;
    }

    const values = timeSeries.dataPoints;
    const currentValue = values[values.length - 1]; // The latest point we are testing
    const historicalValues = values.slice(0, values.length - 1); // The baseline

    // Calculate Mean
    const sum = historicalValues.reduce((a, b) => a + b, 0);
    const mean = sum / historicalValues.length;

    // Calculate Standard Deviation
    const variance = historicalValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / historicalValues.length;
    const stdDev = Math.sqrt(variance);

    if (stdDev === 0) {
        // If there is no variance (all historical values are the same), and current is different, it's an anomaly?
        // Or if current is also same, it's not. 
        if (currentValue !== mean) {
             // Treat as anomaly if it deviates from a flatline, but be careful of noise.
             // For safety in this strict implementation, we skip if stdDev is 0 to avoid division by zero
             return null;
        }
        return null;
    }

    // Calculate Z-Score
    const zScore = (currentValue - mean) / stdDev;

    // Check against threshold (absolute value to catch both spikes and drops)
    // However, usually specific rules care about one direction. 
    // This general strategy reports ANY deviation > 3 sigmas.
    if (Math.abs(zScore) >= this.Z_SCORE_THRESHOLD) {
      const direction = zScore > 0 ? "sudden spike" : "sudden drop";
      
      return new InsightResult(
        InsightType.ANOMALY,
        `Anomaly Detected: ${timeSeries.metricName}`,
        `A ${direction} in ${this.formatMetricName(timeSeries.metricName)} has been detected. Current value (${currentValue}) deviates significantly from the norm (${mean.toFixed(2)}).`,
        {
          metric: timeSeries.metricName,
          zScore: zScore,
          currentValue: currentValue,
          mean: mean,
          stdDev: stdDev
        }
      );
    }

    return null;
  }

  private formatMetricName(key: string): string {
    // Basic humanizing: "abandoned_carts" -> "Abandoned Carts"
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}