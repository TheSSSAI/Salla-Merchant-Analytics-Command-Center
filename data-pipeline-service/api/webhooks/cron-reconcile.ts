import { GlobalBootstrap } from '../../src/infrastructure/GlobalBootstrap';
import { ReconciliationUseCase } from '../../src/application/ReconciliationUseCase';
import { ClickHouseRepository } from '../../src/infrastructure/ClickHouseRepository';
import { PostgresSyncRepository } from '../../src/infrastructure/PostgresSyncRepository';
import { SallaGateway } from '../../src/infrastructure/SallaGateway';
import { ServiceConfig } from '../../src/config/ServiceConfig';

/**
 * Scheduled Cron Handler.
 * Triggered by Vercel Cron to perform daily data reconciliation.
 * Ensures strict consistency between Salla, PostgreSQL, and ClickHouse.
 */
export default async function handler(req: Request) {
  const logger = console;

  // 1. Security: Validate Vercel Cron Signature
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // 2. Bootstrap Infrastructure
    const bootstrap = GlobalBootstrap.getInstance();
    await bootstrap.initialize();

    // 3. Resolve Dependencies
    const clickHouseClient = bootstrap.getClickHouseClient();
    const prismaClient = bootstrap.getPrismaClient();

    const clickHouseRepo = new ClickHouseRepository(clickHouseClient);
    const postgresRepo = new PostgresSyncRepository(prismaClient);
    
    // We need Salla Gateway to fetch latest state for comparison
    const sallaGateway = new SallaGateway(
      ServiceConfig.salla.apiUrl,
      ServiceConfig.salla.clientId,
      ServiceConfig.salla.clientSecret
    );

    // 4. Instantiate Use Case
    const reconciliationUseCase = new ReconciliationUseCase(
      postgresRepo,
      clickHouseRepo,
      sallaGateway,
      logger
    );

    // 5. Execute Logic
    // Runs reconciliation for the last 24 hours by default
    const result = await reconciliationUseCase.execute({
      lookbackHours: 24,
      fixDrift: true
    });

    // 6. Return Summary
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    logger.error('[CronReconcile] Execution Failed', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}