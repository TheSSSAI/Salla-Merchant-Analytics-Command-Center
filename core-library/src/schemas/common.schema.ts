/**
 * Common Validation Schemas
 * 
 * This file defines reusable Zod schemas for common data types used throughout the application.
 * Centralizing these definitions ensures consistency in validation logic (e.g., email format, UUIDs)
 * across all microservices and the frontend.
 * 
 * @module Schemas/Common
 */

import { z } from 'zod';

/**
 * Reusable schema for validating email addresses.
 * Enforces non-empty string, standard email format, trimming, and lowercasing.
 */
export const emailSchema = z
  .string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  })
  .email('Invalid email address format')
  .trim()
  .toLowerCase();

/**
 * Reusable schema for validating UUIDs (v4).
 * Used for ID validation across entities.
 */
export const uuidSchema = z
  .string({
    required_error: 'ID is required',
    invalid_type_error: 'ID must be a string',
  })
  .uuid('Invalid UUID format');

/**
 * Reusable schema for validating ISO 8601 date strings.
 * Ensures the string can be parsed into a valid Date object.
 */
export const isoDateSchema = z
  .string({
    required_error: 'Date is required',
    invalid_type_error: 'Date must be a string',
  })
  .datetime({ message: 'Invalid ISO 8601 date format' });

/**
 * Reusable schema for standard pagination parameters.
 * Validates 'page' and 'limit' query parameters with sensible defaults and bounds.
 */
export const paginationSchema = z.object({
  /**
   * Page number (1-based).
   * Default: 1
   * Minimum: 1
   */
  page: z.coerce
    .number()
    .int()
    .min(1, 'Page must be greater than or equal to 1')
    .default(1),

  /**
   * Number of items per page.
   * Default: 20
   * Minimum: 1
   * Maximum: 100 (to prevent DOS via massive queries)
   */
  limit: z.coerce
    .number()
    .int()
    .min(1, 'Limit must be greater than or equal to 1')
    .max(100, 'Limit cannot exceed 100 items')
    .default(20),
});

/**
 * Reusable schema for sorting parameters.
 * Validates 'sortBy' and 'sortOrder'.
 */
export const sortSchema = z.object({
  /**
   * The field to sort by.
   * Optional.
   */
  sortBy: z.string().optional(),

  /**
   * The sort direction.
   * Optional, defaults to 'asc' if not provided.
   */
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

/**
 * Container object for exporting all common schemas.
 * Facilitates namespace import: import { CommonValidationSchemas } from ...
 */
export const CommonValidationSchemas = {
  email: emailSchema,
  uuid: uuidSchema,
  isoDate: isoDateSchema,
  pagination: paginationSchema,
  sort: sortSchema,
};