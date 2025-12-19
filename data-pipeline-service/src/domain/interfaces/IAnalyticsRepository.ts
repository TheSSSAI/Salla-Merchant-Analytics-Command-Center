import { SalesFactDTO } from '../models/SalesFactDTO';

/**
 * Interface for the Analytics Data Warehouse (OLAP) Repository.
 * This contract defines the write operations required for the ETL pipeline.
 * Implementations should handle buffering and batching specific to the underlying technology (e.g., ClickHouse).
 */
export interface IAnalyticsRepository {
  /**
   * Inserts a single sales fact into the analytics storage.
   * Implementation should optimize for high-throughput writes.
   * @param fact The normalized sales fact DTO.
   */
  insertSalesFact(fact: SalesFactDTO): Promise<void>;

  /**
   * Inserts a batch of sales facts into the analytics storage.
   * This is preferred for bulk synchronization jobs.
   * @param facts Array of sales fact DTOs.
   */
  insertSalesFactBatch(facts: SalesFactDTO[]): Promise<void>;

  /**
   * Checks if a specific order has already been processed to ensure idempotency.
   * @param orderId The unique identifier of the order.
   * @returns True if the order exists in the OLAP store.
   */
  exists(orderId: string): Promise<boolean>;

  /**
   * Executes a raw query for health checks or complex validations.
   * @returns True if the connection is healthy.
   */
  healthCheck(): Promise<boolean>;
}