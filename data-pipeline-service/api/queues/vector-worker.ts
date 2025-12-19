import { GlobalBootstrap } from '../../src/infrastructure/GlobalBootstrap';
import { QStashSignatureValidator } from '../_middlewares/QStashSignatureValidator';
import { OpenAIGateway } from '../../src/infrastructure/OpenAIGateway';
import { PineconeRepository } from '../../src/infrastructure/PineconeRepository';
import { ServiceConfig } from '../../src/config/ServiceConfig';
import { InternalEvent } from '../../src/domain/models/InternalEvent';

/**
 * Queue Worker: Vector Worker
 * Dedicated worker for handling vector embedding generation and upsertion.
 * Offloads CPU/Latency intensive OpenAI calls from the main event processing flow
 * or handles batch vectorization jobs.
 */
export default async function handler(req: Request) {
  const logger = console;

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // 1. Security: QStash Signature Validation
    const signatureValidator = new QStashSignatureValidator();
    const isVerified = await signatureValidator.verify(req);

    if (!isVerified) {
      logger.warn('[VectorWorker] Unauthorized Request');
      return new Response('Unauthorized', { status: 401 });
    }

    // 2. Payload Parsing
    // Payload can be an InternalEvent or a specific VectorJobDTO
    const payload = await req.json();
    const { id, text, metadata } = payload;

    // Simple validation for vector task payload
    if (!id || !text) {
      // It might be an InternalEvent, check structure
      if (payload.payload && payload.eventId) {
        // Handle as event-based triggering if payload structure differs
        // For now, assuming direct vector task structure
      } else {
        return new Response('Invalid Vector Payload', { status: 400 });
      }
    }

    // 3. Infrastructure Bootstrap
    await GlobalBootstrap.getInstance().initialize();

    // 4. Dependency Resolution
    const openAIGateway = new OpenAIGateway(
      ServiceConfig.openai.apiKey,
      ServiceConfig.openai.embeddingModel
    );

    const pineconeRepo = new PineconeRepository(
      ServiceConfig.pinecone.apiKey,
      ServiceConfig.pinecone.environment,
      ServiceConfig.pinecone.indexName
    );

    // 5. Business Logic Implementation
    // Note: Since this is a dedicated infrastructure task, we might orchestrate it 
    // directly here if no specific Application UseCase exists for "Just Vectorize".
    // This acts as the Application Service layer for this specific async task.

    logger.info(`[VectorWorker] Generating embedding for ID: ${id}`);

    // A. Generate Embedding
    const vector = await openAIGateway.generateEmbedding(text);

    if (!vector || vector.length === 0) {
      throw new Error('Failed to generate embedding vector');
    }

    // B. Upsert to Vector DB
    await pineconeRepo.upsertVectors([{
      id: String(id),
      values: vector,
      metadata: metadata || {}
    }]);

    logger.info(`[VectorWorker] Successfully upserted vector for ID: ${id}`);

    return new Response(JSON.stringify({ status: 'vectorized', id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    logger.error('[VectorWorker] Failure', error);
    // Retry on failure
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}