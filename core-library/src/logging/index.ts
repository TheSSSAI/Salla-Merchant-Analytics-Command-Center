/**
 * @file src/logging/index.ts
 * @description Aggregation barrel for shared logging configurations.
 * Exports the LoggerConfigFactory to ensure consistent log formats (JSON, correlation IDs)
 * across distributed services for ingestion by Axiom/ELK stacks.
 * 
 * Dependencies:
 * - Level 2: logger.config.ts (Configuration factory logic)
 */

export * from './logger.config';