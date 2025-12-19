import { GlobalBootstrap } from '../../src/infrastructure/GlobalBootstrap';
import { SallaSignatureValidator } from '../_middlewares/SallaSignatureValidator';
import { QStashService } from '../../src/infrastructure/QStashService';
import { IngestWebhookUseCase } from '../../src/application/IngestWebhookUseCase';
import { ServiceConfig } from '../../src/config/ServiceConfig';

export const config = {
  api: {
    bodyParser: false, // We need raw body for signature validation
  },
};

/**
 * Public Ingress for Salla Webhooks.
 * Validates HMAC signature and enqueues event to QStash for async processing.
 * Must respond within 200-300ms.
 */
export default async function handler(req: Request) {
  // 1. Method Validation
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const logger = console;

  try {
    // 2. Global Infrastructure Bootstrap (Cold Start Optimization)
    await GlobalBootstrap.getInstance().initialize();

    // 3. Read Raw Body and Signature Header
    // Note: In Vercel Edge/Serverless, req.text() consumes the stream.
    const rawBody = await req.text();
    const signature = req.headers.get('x-salla-signature') || '';

    // 4. Security: Validate Salla Signature
    const signatureValidator = new SallaSignatureValidator();
    const isValid = await signatureValidator.validate(rawBody, signature);

    if (!isValid) {
      logger.warn('[SallaIngress] Invalid Signature', { signature });
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid Signature' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 5. Parse Payload
    const payload = JSON.parse(rawBody);
    const eventType = payload.event || 'unknown';

    // 6. Composition Root: Dependency Injection
    const qstashService = new QStashService(
      ServiceConfig.qstash.url,
      ServiceConfig.qstash.token,
      ServiceConfig.qstash.signingKey
    );

    const ingestUseCase = new IngestWebhookUseCase(qstashService, logger);

    // 7. Execute Application Logic
    // This publishes the event to the processing queue (api/queues/process-event)
    await ingestUseCase.execute(payload, eventType);

    // 8. Acknowledge Receipt
    return new Response(JSON.stringify({ status: 'queued', event: eventType }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    logger.error('[SallaIngress] Processing Error', error);

    // Return 500 so Salla (or monitoring) knows it failed, though Salla might retry.
    // For ingress, we generally want to accept 200 if it's a logic error to stop Salla retries,
    // but 500 if it's a transient system error.
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}