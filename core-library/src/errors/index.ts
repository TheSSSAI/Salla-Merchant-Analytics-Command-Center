/**
 * @file src/errors/index.ts
 * @description Aggregation barrel for the application's error hierarchy.
 * Exports the abstract base error and concrete implementation classes for
 * standardized exception handling across microservices.
 * 
 * Dependencies:
 * - Level 0: base.error.ts (Abstract base class)
 * - Level 1: validation.error.ts (Input validation exceptions)
 * - Level 1: not-found.error.ts (Resource missing exceptions)
 */

export * from './base.error';
export * from './validation.error';
export * from './not-found.error';