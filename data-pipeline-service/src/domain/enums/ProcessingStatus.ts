/**
 * Represents the status of an asynchronous processing job or event.
 * Used for tracking the lifecycle of ETL tasks and Webhook handling.
 */
export enum ProcessingStatus {
  /** The event has been received and queued for processing. */
  QUEUED = 'QUEUED',

  /** The event is currently being processed by a worker. */
  IN_PROGRESS = 'IN_PROGRESS',

  /** The event has been successfully processed and data persisted. */
  COMPLETED = 'COMPLETED',

  /** The processing failed, but it may be retried. */
  FAILED_RETRYABLE = 'FAILED_RETRYABLE',

  /** The processing failed permanently (e.g., validation error, max retries exceeded). */
  FAILED_PERMANENT = 'FAILED_PERMANENT',

  /** The event was skipped due to business rules (e.g., duplicate, irrelevant). */
  SKIPPED = 'SKIPPED'
}