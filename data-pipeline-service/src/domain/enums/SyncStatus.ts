/**
 * Represents the status of a historical data synchronization job.
 * Used in the SyncJob entity to track bulk import progress (FR-104).
 */
export enum SyncStatus {
  /** The sync job has been created but not yet started. */
  PENDING = 'PENDING',

  /** The sync job is actively fetching and processing data pages. */
  RUNNING = 'RUNNING',

  /** The sync job is paused, likely due to rate limiting or manual intervention. */
  PAUSED = 'PAUSED',

  /** The sync job has successfully imported all requested data. */
  COMPLETED = 'COMPLETED',

  /** The sync job encountered a critical error and stopped. */
  FAILED = 'FAILED',

  /** The sync job was partially completed but stopped (e.g., user cancellation). */
  CANCELLED = 'CANCELLED'
}