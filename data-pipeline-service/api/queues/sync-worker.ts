import { GlobalBootstrap } from '../../src/infrastructure/GlobalBootstrap';
import { QStashSignatureValidator } from '../_middlewares/QStashSignatureValidator';
import { HistoricalSyncUseCase } from '../../src/application/HistoricalSyncUseCase';
import { SallaGateway } from '../../src/infrastructure/SallaGateway';
import { ClickHouseRepository } from '../../src/infrastructure/ClickHouseRepository';
import { PostgresSyncRepository } from '../../src/infrastructure/PostgresSyncRepository';
import { QStashService } from '../../src/infrastructure/QStashService';
import { ServiceConfig } from '../../src/config/ServiceConfig';

/**
 * Queue Worker: Sync Worker
 * Handles recursive pagination for historical data synchronization (FR-104).
 * Processes one page of data, then enqueues the next page if available.
 */
export default async function handler(req: Request) {
  const logger = console;

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // 1. Security: QStash Signature
    const signatureValidator = new QStashSignatureValidator();
    const isVerified = await signatureValidator.verify(req);

    if (!isVerified) {
      logger.warn('[SyncWorker] Unauthorized Request');
      return new Response('Unauthorized', { status: 401 });
    }

    // 2. Parse Job Parameters
    // Expected payload: { jobId: string, page: number, merchantId: string, depth: '12m' | '24m' }
    const payload = await req.json();
    const { jobId, page, merchantId } = payload;

    if (!jobId || typeof page !== 'number') {
      return new Response('Invalid Job Parameters', { status: 400 });
    }

    // 3. Bootstrap
    const bootstrap = GlobalBootstrap.getInstance();
    await bootstrap.initialize();

    // 4. Dependency Resolution
    const prismaClient = bootstrap.getPrismaClient();
    const clickHouseClient = bootstrap.getClickHouseClient();

    // Repository for updating job status/cursor in Postgres
    const syncCheckpointRepo = new PostgresSyncRepository(prismaClient);
    
    // Repository for loading data into OLAP
    const analyticsRepo = new ClickHouseRepository(clickHouseClient);

    // Gateway for fetching data from Salla
    const sallaGateway = new SallaGateway(
      ServiceConfig.salla.apiUrl,
      ServiceConfig.salla.clientId,
      ServiceConfig.salla.clientSecret
    );

    // Message Broker for recursion (publishing next page task)
    const broker = new QStashService(
      ServiceConfig.qstash.url,
      ServiceConfig.qstash.token,
      ServiceConfig.qstash.signingKey
    );

    // 5. Use Case Execution
    const syncUseCase = new HistoricalSyncUseCase(
      sallaGateway,
      broker,
      analyticsRepo,
      syncCheckpointRepo,
      logger
    );

    // Executes sync for the specific page. 
    // Logic inside UseCase handles: Fetch -> Transform -> Load -> Check Next Page -> Broker.publish()
    await syncUseCase.execute(jobId, page);

    return new Response(JSON.stringify({ status: 'page_processed', jobId, page }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    logger.error('[SyncWorker] Execution Failed', error);
    // 500 triggers QStash retry for this specific page
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}