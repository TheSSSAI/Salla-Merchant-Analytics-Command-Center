/**
 * @file src/types/index.ts
 * @description Aggregation barrel for all TypeScript type definitions, interfaces, and enums.
 * This file serves as the public API surface for the types module of the core library.
 * 
 * Dependencies:
 * - Level 0: domain.types.ts (Core domain entities and enums like CurrencyCode)
 * - Level 0: api.types.ts (API response wrappers and contracts)
 */

export * from './domain.types';
export * from './api.types';