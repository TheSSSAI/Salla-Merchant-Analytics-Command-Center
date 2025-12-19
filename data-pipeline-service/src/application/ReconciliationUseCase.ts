import { SallaGateway } from '../infrastructure/SallaGateway';
import { IAnalyticsRepository } from '../domain/interfaces/IAnalyticsRepository';
import { TransformationService } from '../domain/TransformationService';

/**
 * Application Service for reconciling data drift.
 * Intended to run as a scheduled nightly job (cron).
 * 
 * Strategy:
 * 1. Identify a time window (e.g., last 24 hours).
 * 2. Fetch all orders from Salla updated within that window.
 * 3. Re-transform and Re-insert into ClickHouse.
 * 
 * Relies on ClickHouse's `ReplacingMergeTree` engine to handle deduplication 
 * (upsert behavior) based on OrderId.
 */
export class ReconciliationUseCase {
    private readonly _sallaGateway: SallaGateway;
    private readonly _analyticsRepo: IAnalyticsRepository;
    private readonly _transformer: TransformationService;

    constructor(
        sallaGateway: SallaGateway,
        analyticsRepo: IAnalyticsRepository,
        transformer: TransformationService
    ) {
        this._sallaGateway = sallaGateway;
        this._analyticsRepo = analyticsRepo;
        this._transformer = transformer;
    }

    /**
     * Executes reconciliation for a specific merchant.
     * @param merchantId The merchant to reconcile
     * @param lookbackHours How far back to check for updates (default 24h)
     */
    public async execute(merchantId: string, lookbackHours: number = 24): Promise<{ processed: number, success: boolean }> {
        console.log(`[ReconciliationUseCase] Starting reconciliation for merchant ${merchantId} (Window: ${lookbackHours}h)`);

        const startDate = new Date();
        startDate.setHours(startDate.getHours() - lookbackHours);

        let currentPage = 1;
        let hasNextPage = true;
        let totalProcessed = 0;

        try {
            // Loop through all pages of updated orders
            while (hasNextPage) {
                // Fetch orders updated since startDate
                const result = await this._sallaGateway.fetchUpdatedOrders(
                    merchantId,
                    startDate,
                    currentPage
                );

                if (!result.data || result.data.length === 0) {
                    break;
                }

                // Transform to Facts
                const salesFacts = result.data.flatMap(order => 
                    this._transformer.transformOrderToSalesFacts(order)
                );

                // Insert (Upsert) to OLAP
                // Note: ClickHouse efficient bulk insert is preferred
                if (salesFacts.length > 0) {
                    await this._analyticsRepo.insertSalesFact(salesFacts);
                    totalProcessed += salesFacts.length;
                }

                // Check pagination
                if (result.pagination && result.pagination.hasNext) {
                    currentPage++;
                } else {
                    hasNextPage = false;
                }
            }

            console.log(`[ReconciliationUseCase] Completed. Processed ${totalProcessed} facts.`);
            return { processed: totalProcessed, success: true };

        } catch (error) {
            console.error(`[ReconciliationUseCase] Failed for merchant ${merchantId}:`, error);
            // Reconciliation is a maintenance task; errors should be logged but might not require immediate user intervention
            // depending on monitoring strategy.
            throw error; 
        }
    }
}