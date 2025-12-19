import { PrismaClient } from '@prisma/client';
import { GlobalBootstrap } from './GlobalBootstrap';
import { SyncStatus } from '../domain/enums/SyncStatus'; // Assumed Level 0 enum

/**
 * PostgresSyncRepository
 * 
 * Repository for managing the state of Data Synchronization Jobs.
 * Uses Prisma to interact with the PostgreSQL OLTP database.
 * Crucial for checkpointing long-running recursive sync jobs.
 */
export class PostgresSyncRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = GlobalBootstrap.getInstance().prisma;
  }

  /**
   * Creates a new synchronization job record.
   * 
   * @param merchantId The ID of the merchant
   * @param depth '12m' or '24m' indicating import depth
   */
  public async createJob(merchantId: string, depth: string): Promise<string> {
    try {
      const job = await this.prisma.syncJob.create({
        data: {
          merchantId: merchantId,
          status: 'PENDING', // Mapped from SyncStatus enum usually
          depth: depth,
          processedPages: 0,
          startedAt: new Date(),
        },
      });
      return job.id;
    } catch (error) {
      console.error('CreateSyncJob Error:', error);
      throw new Error(`Failed to create sync job: ${(error as Error).message}`);
    }
  }

  /**
   * Updates the checkpoint (cursor) of a running job.
   * This allows the job to resume or continue correctly in the recursive chain.
   * 
   * @param jobId The job ID
   * @param pagesProcessed Number of pages successfully processed
   * @param lastCursor Optional cursor/date for resumption
   */
  public async updateCheckpoint(jobId: string, pagesProcessed: number, lastCursor?: string): Promise<void> {
    try {
      await this.prisma.syncJob.update({
        where: { id: jobId },
        data: {
          processedPages: pagesProcessed,
          cursor: lastCursor,
          status: 'IN_PROGRESS',
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('UpdateCheckpoint Error:', error);
      throw new Error(`Failed to update checkpoint: ${(error as Error).message}`);
    }
  }

  /**
   * Marks a job as completed.
   * 
   * @param jobId The job ID
   */
  public async completeJob(jobId: string): Promise<void> {
    try {
      await this.prisma.syncJob.update({
        where: { id: jobId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('CompleteJob Error:', error);
      throw new Error(`Failed to complete job: ${(error as Error).message}`);
    }
  }

  /**
   * Marks a job as failed with an error message.
   * 
   * @param jobId The job ID
   * @param errorMsg The error description
   */
  public async failJob(jobId: string, errorMsg: string): Promise<void> {
    try {
      await this.prisma.syncJob.update({
        where: { id: jobId },
        data: {
          status: 'FAILED',
          errorMessage: errorMsg,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('FailJob Error:', error);
      // Last ditch effort logging, don't throw to avoid infinite error loops
    }
  }

  /**
   * Retrieves the current status of a job.
   */
  public async getJobStatus(jobId: string): Promise<any> {
    try {
      const job = await this.prisma.syncJob.findUnique({
        where: { id: jobId },
        select: { status: true, processedPages: true, errorMessage: true },
      });
      return job;
    } catch (error) {
      console.error('GetJobStatus Error:', error);
      throw new Error(`Failed to get job status: ${(error as Error).message}`);
    }
  }
}