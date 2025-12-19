/**
 * Defines the operational status of a background synchronization job.
 * 
 * - PENDING: The job has been queued but has not yet started processing.
 * - RUNNING: The job is currently actively processing data.
 * - COMPLETED: The job has finished successfully.
 * - FAILED: The job encountered a terminal error and stopped.
 */
export type SyncStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';

/**
 * Represents the current state of a data synchronization process.
 * Used for real-time progress reporting to the frontend via polling or streams.
 */
export interface SyncState {
  /**
   * The current operational status of the sync job.
   */
  status: SyncStatus;

  /**
   * The progress of the synchronization as a percentage (0-100).
   * Used to drive progress bar UI components.
   */
  progress: number;

  /**
   * The estimated time remaining in seconds.
   * Can be null if the job is PENDING or if the estimation cannot be calculated yet.
   */
  estimatedTimeRemaining: number | null;

  /**
   * Optional message providing context about the current step (e.g., "Importing Orders...").
   */
  message?: string;

  /**
   * The ISO timestamp of the last status update.
   */
  lastUpdated?: string;
}

/**
 * Represents the API response structure for the sync status endpoint.
 */
export interface SyncStatusResponse {
  merchantId: string;
  jobId: string;
  state: SyncState;
}

/**
 * Configuration payload for initiating a new synchronization job.
 */
export interface InitiateSyncRequest {
  /**
   * The depth of historical data to import in months.
   * Typically 12 or 24 months based on user selection.
   */
  monthsToImport: 12 | 24;
}