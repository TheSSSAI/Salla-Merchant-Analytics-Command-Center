import { IAnalyticsRepository } from '../domain/interfaces/IAnalyticsRepository';
import { SalesFactDTO } from '../domain/models/SalesFactDTO';
import { GlobalBootstrap } from './GlobalBootstrap';
import { ClickHouseClient } from '@clickhouse/client';

/**
 * ClickHouseRepository
 * 
 * Implementation of the Analytics Repository using ClickHouse.
 * Handles high-throughput data insertion using Async Inserts to optimize 
 * performance in a serverless environment where batching is difficult.
 */
export class ClickHouseRepository implements IAnalyticsRepository {
  private client: ClickHouseClient;

  constructor() {
    this.client = GlobalBootstrap.getInstance().clickhouse;
  }

  /**
   * Inserts sales facts into the OLAP warehouse.
   * Uses 'async_insert=1' to allow ClickHouse to handle server-side buffering.
   * 
   * @param facts Array of SalesFactDTO objects
   */
  public async insertSalesFact(facts: SalesFactDTO[]): Promise<void> {
    if (facts.length === 0) return;

    try {
      await this.client.insert({
        table: 'sales_facts',
        values: facts,
        format: 'JSONEachRow',
        clickhouse_settings: {
          async_insert: 1,
          wait_for_async_insert: 0, // Fire and forget for speed, set to 1 if strict durability needed
        },
      });
    } catch (error) {
      console.error('ClickHouse Insert Error:', error);
      // Re-throw to trigger DLQ logic in the pipeline
      throw new Error(`Failed to insert sales facts: ${(error as Error).message}`);
    }
  }

  /**
   * Inserts abandoned cart facts into the OLAP warehouse.
   * 
   * @param facts Array of abandoned cart objects
   */
  public async insertAbandonedCartFact(facts: any[]): Promise<void> {
    if (facts.length === 0) return;

    try {
      await this.client.insert({
        table: 'abandoned_cart_facts',
        values: facts,
        format: 'JSONEachRow',
        clickhouse_settings: {
          async_insert: 1,
          wait_for_async_insert: 0,
        },
      });
    } catch (error) {
      console.error('ClickHouse Abandoned Cart Insert Error:', error);
      throw new Error(`Failed to insert abandoned cart facts: ${(error as Error).message}`);
    }
  }

  /**
   * Checks if the ClickHouse connection is healthy.
   */
  public async healthCheck(): Promise<boolean> {
    try {
      const result = await this.client.query({
        query: 'SELECT 1',
        format: 'JSON',
      });
      const rows = await result.json();
      return true;
    } catch (error) {
      console.error('ClickHouse Health Check Failed:', error);
      return false;
    }
  }
}