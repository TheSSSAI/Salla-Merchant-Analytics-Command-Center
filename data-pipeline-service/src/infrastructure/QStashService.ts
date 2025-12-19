import { IMessaging } from '../domain/interfaces/IMessaging';
import { InternalEvent } from '../domain/models/InternalEvent';
import { GlobalBootstrap } from './GlobalBootstrap';
import { Client as QStashClient } from '@upstash/qstash';
import { ServiceConfig } from '../config/ServiceConfig';

/**
 * QStashService
 * 
 * Implementation of the Messaging interface using Upstash QStash.
 * Provides a serverless-native message queue mechanism for asynchronous processing.
 */
export class QStashService implements IMessaging {
  private client: QStashClient;

  constructor() {
    this.client = GlobalBootstrap.getInstance().qstash;
  }

  /**
   * Publishes an event to a specific queue/topic.
   * In QStash, topics are used to broadcast, but here we might target specific endpoints
   * or a topic that fans out to workers.
   * 
   * @param topic The topic or destination queue name
   * @param event The domain event to publish
   * @param delaySeconds Optional delay in seconds
   */
  public async publish(topic: string, event: InternalEvent, delaySeconds?: number): Promise<string> {
    try {
      // Determine destination. If 'topic' looks like a URL, treat as endpoint, else a QStash topic
      // For this architecture, we assume topics are mapped to URL groups or simple topics.
      // We will use the publishJSON method.
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Upstash-Deduplication-Id': event.eventId, // Idempotency
      };

      if (delaySeconds && delaySeconds > 0) {
        headers['Upstash-Delay'] = `${delaySeconds}s`;
      }

      const result = await this.client.publishJSON({
        topic: topic, 
        body: event,
        headers: headers,
        // If retries are needed, they are configured at the Topic level in QStash dashboard
        // or can be overridden here with 'Upstash-Retries' header
      });

      return result.messageId;
    } catch (error) {
      console.error(`QStash Publish Error [${topic}]:`, error);
      throw new Error(`Failed to publish message to QStash: ${(error as Error).message}`);
    }
  }

  /**
   * Publishes a batch of events.
   * QStash currently supports batching via array of messages.
   * 
   * @param topic Destination topic
   * @param events Array of events
   */
  public async publishBatch(topic: string, events: InternalEvent[]): Promise<string[]> {
    if (events.length === 0) return [];

    try {
      const messages = events.map(event => ({
        topic: topic,
        body: event,
        headers: {
          'Content-Type': 'application/json',
          'Upstash-Deduplication-Id': event.eventId,
        }
      }));

      // Note: As of typical QStash SDK, batch sending might require specific endpoint logic
      // or iterating. We'll iterate concurrently if batch API isn't strictly available 
      // in the version, but assume modern SDK batch support or parallel promises.
      
      const promises = messages.map(msg => this.client.publishJSON(msg));
      const results = await Promise.all(promises);
      
      return results.map(r => r.messageId);
    } catch (error) {
      console.error(`QStash Batch Publish Error [${topic}]:`, error);
      throw new Error(`Failed to publish batch to QStash: ${(error as Error).message}`);
    }
  }
}