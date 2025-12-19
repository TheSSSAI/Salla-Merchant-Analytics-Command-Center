/**
 * Interface for accessing aggregated analytical data (OLAP).
 * Used by Insight Generators to detect trends and anomalies.
 */
export interface IAnalyticsDataRepository {
  /**
   * Retrieves aggregated sales metrics for a specific merchant over a time period.
   * 
   * @param merchantId The tenant identifier.
   * @param startDate The start of the analysis window.
   * @param endDate The end of the analysis window.
   * @returns A promise resolving to a structured object containing daily/weekly sales figures.
   */
  getSalesMetrics(merchantId: string, startDate: Date, endDate: Date): Promise<any>;

  /**
   * Retrieves product performance metrics.
   * 
   * @param merchantId The tenant identifier.
   * @param limit Number of top products to retrieve.
   * @returns Promise resolving to a list of products with their conversion/sales stats.
   */
  getTopProducts(merchantId: string, limit: number): Promise<any[]>;

  /**
   * Retrieves cart abandonment statistics.
   * 
   * @param merchantId The tenant identifier.
   * @param since The timestamp to look back from.
   * @returns Promise resolving to abandonment rate and total value stats.
   */
  getAbandonmentStats(merchantId: string, since: Date): Promise<any>;
}