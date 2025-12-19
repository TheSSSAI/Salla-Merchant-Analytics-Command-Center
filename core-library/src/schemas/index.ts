/**
 * @file src/schemas/index.ts
 * @description Aggregation barrel for Zod validation schemas.
 * Centralizes data contracts to ensure consistency across the Frontend, Backend, and Data Pipeline.
 * 
 * Dependencies:
 * - Level 0: common.schema.ts (Reusable primitives like Email, UUID)
 * - Level 1: user.schema.ts (Domain entity schemas like CreateUser)
 */

export * from './common.schema';
export * from './user.schema';