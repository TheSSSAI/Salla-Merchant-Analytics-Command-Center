import { SallaGateway } from '../infrastructure/SallaGateway';
import { IAnalyticsRepository } from '../domain/interfaces/IAnalyticsRepository';
import { PostgresSyncRepository } from '../infrastructure/PostgresSyncRepository';
import { IMessaging } from '../domain/interfaces/IMessaging';
import { TransformationService } from '../domain/TransformationService';
import { SyncStatus } from '../domain/enums/SyncStatus';

interface SyncJobPayload {
    jobId: string;
    merchantId: string;
    depth: '12m' | '24m'; // 12 months or 24 months
    page: number;
    resource: 'orders' | 'customers' | 'products';
}

/**
 * Application Service orchestrating the initial bulk import of historical data.
 * 
 * Implements the "Recursive Function" pattern:
 * 1. Process a single page of data from Salla API.
 * 2. Save data to ClickHouse.
 * 3. Update job progress in Postgres.
 * 4. If more pages exist, publish a message to QStash to trigger the next page.
 * 
 * This approach circumvents Serverless execution time limits (timeout).
 */
export class HistoricalSyncUseCase {
    private readonly _sallaGateway: SallaGateway;
    private readonly _analyticsRepo: IAnalyticsRepository;
    private readonly _syncRepo: PostgresSyncRepository;
    private readonly _messaging: IMessaging;
    private readonly _transformer: TransformationService;

    constructor(
        sallaGateway: SallaGateway,
        analyticsRepo: IAnalyticsRepository,
        syncRepo: PostgresSyncRepository,
        messaging: IMessaging,
        transformer: TransformationService
    ) {
        this._sallaGateway = sallaGateway;
        this._analyticsRepo = analyticsRepo;
        this._syncRepo = syncRepo;
        this._messaging = messaging;
        this._transformer = transformer;
    }

    /**
     * Executes one iteration (one page) of the synchronization job.
     */
    public async execute(payload: SyncJobPayload): Promise<void> {
        const { jobId, merchantId, page, resource, depth } = payload;

        console.log(`[HistoricalSyncUseCase] Job ${jobId}: Syncing ${resource} page ${page} for merchant ${merchantId}`);

        // 1. Validate Job State
        const job = await this._syncRepo.getJobStatus(jobId);
        if (!job) {
            throw new Error(`Sync Job ${jobId} not found.`);
        }
        if (job.status === SyncStatus.FAILED || job.status === SyncStatus.COMPLETED) {
            console.log(`[HistoricalSyncUseCase] Job ${jobId} is in ${job.status} state. Stopping recursion.`);
            return;
        }

        // 2. Determine Date Range based on depth
        const startDate = this.calculateStartDate(depth);

        try {
            // 3. Fetch Data Page from Salla
            // We inject the date filter to only fetch relevant historical data
            const result = await this._sallaGateway.fetchResourcePage(
                merchantId,
                resource,
                page,
                startDate
            );

            // 4. Transform and Load
            if (result.data && result.data.length > 0) {
                if (resource === 'orders') {
                    const salesFacts = result.data.flatMap(order => 
                        this._transformer.transformOrderToSalesFacts(order)
                    );
                    await this._analyticsRepo.insertSalesFact(salesFacts);
                } 
                // Add handlers for 'products' or 'customers' here if scope expands
            }

            // 5. Update Progress Checkpoint
            await this._syncRepo.updateJobProgress(jobId, {
                processedCount: (job.processedCount || 0) + result.data.length,
                lastPageProcessed: page,
                status: SyncStatus.IN_PROGRESS
            });

            // 6. Recursion Decision
            if (result.pagination && result.pagination.hasNext) {
                // Determine next resource or next page
                const nextPayload: SyncJobPayload = {
                    ...payload,
                    page: page + 1
                };
                
                // Publish to self (QStash)
                await this._messaging.publish('sync-worker', nextPayload);
                console.log(`[HistoricalSyncUseCase] Job ${jobId}: Enqueued next page ${page + 1}`);
            } else {
                // Current resource finished. 
                // If we need to sync multiple resources (e.g., first products, then orders), 
                // logic here would trigger the next resource starting at page 1.
                // Assuming simplified scope (Orders only) for this implementation:
                
                await this._syncRepo.completeJob(jobId);
                console.log(`[HistoricalSyncUseCase] Job ${jobId}: Sync completed successfully.`);
                
                // Optional: Send completion notification via Notification Service (Level 4 responsibility)
            }

        } catch (error) {
            console.error(`[HistoricalSyncUseCase] Job ${jobId} failed on page ${page}:`, error);
            
            // Mark job as failed in DB so UI reflects error state
            await this._syncRepo.failJob(jobId, error instanceof Error ? error.message : 'Unknown error');
            
            // We generally don't rethrow here because we want to stop the recursion loop cleanly
            // and let the user restart via UI if needed.
        }
    }

    private calculateStartDate(depth: '12m' | '24m'): Date {
        const date = new Date();
        if (depth === '24m') {
            date.setFullYear(date.getFullYear() - 2);
        } else {
            date.setFullYear(date.getFullYear() - 1);
        }
        return date;
    }
}