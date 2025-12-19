/**
 * API Type Definitions
 * 
 * This file defines the standard contracts for API communication within the platform.
 * It ensures that all services (internal and external) speak a consistent protocol
 * regarding response envelopes, error structures, and metadata.
 * 
 * @module Types/API
 */

/**
 * Detailed structure of an API Error.
 */
export interface ApiErrorDetails {
  /**
   * A machine-readable error code (e.g., 'VALIDATION_ERROR', 'USER_NOT_FOUND').
   */
  code: string;

  /**
   * A human-readable message describing the error.
   */
  message: string;

  /**
   * Optional additional details about the error.
   * Useful for validation errors (listing specific fields) or debugging.
   */
  details?: unknown;

  /**
   * Optional stack trace, typically only exposed in development environments.
   */
  stack?: string;
}

/**
 * Metadata included in API responses.
 * Used for observability, tracing, and client-side processing.
 */
export interface ApiMeta {
  /**
   * The timestamp when the response was generated (ISO 8601).
   */
  timestamp: string;

  /**
   * A unique correlation ID for the request, used for distributed tracing.
   */
  requestId: string;

  /**
   * Optional pagination metadata.
   */
  pagination?: PaginationMeta;
}

/**
 * Pagination metadata structure.
 */
export interface PaginationMeta {
  /**
   * The current page number (1-based).
   */
  page: number;

  /**
   * The number of items per page.
   */
  limit: number;

  /**
   * The total number of items available across all pages.
   */
  totalItems: number;

  /**
   * The total number of pages.
   */
  totalPages: number;

  /**
   * Whether there is a next page available.
   */
  hasNextPage: boolean;

  /**
   * Whether there is a previous page available.
   */
  hasPreviousPage: boolean;
}

/**
 * Standardized generic wrapper for all API responses.
 * 
 * @template T The type of the data payload. Defaults to void for responses without body.
 */
export interface ApiResponse<T = void> {
  /**
   * Indicates whether the operation was successful.
   */
  success: boolean;

  /**
   * The data payload. Present if success is true.
   */
  data: T;

  /**
   * Error details. Present if success is false.
   */
  error?: ApiErrorDetails;

  /**
   * Response metadata.
   */
  meta: ApiMeta;
}

/**
 * Parameters for standard pagination requests.
 */
export interface PaginationParams {
  /**
   * The page number to retrieve (default: 1).
   */
  page?: number;

  /**
   * The number of items to retrieve per page (default: 20).
   */
  limit?: number;
}

/**
 * Parameters for standard sorting requests.
 */
export interface SortParams {
  /**
   * The field to sort by.
   */
  sortBy?: string;

  /**
   * The sort direction ('asc' or 'desc').
   */
  sortOrder?: 'asc' | 'desc';
}