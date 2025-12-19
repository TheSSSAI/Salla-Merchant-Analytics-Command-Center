/**
 * Interface for Asynchronous Messaging Infrastructure.
 * Decouples the application from specific message brokers (e.g., Upstash QStash, SQS, RabbitMQ).
 */
export interface IMessaging {
  /**
   * Publishes a message to a specific topic or destination.
   * @param destination The topic name or URL endpoint.
   * @param payload The message payload.
   * @param options Optional configuration like delay, deduplication ID, or retries.
   * @returns The message identifier assigned by the broker.
   */
  publish(destination: string, payload: any, options?: MessageOptions): Promise<string>;

  /**
   * Publishes a batch of messages efficiently.
   * @param messages Array of message objects containing destination and payload.
   * @returns Array of message identifiers.
   */
  publishBatch(messages: Array<{ destination: string; payload: any; options?: MessageOptions }>): Promise<string[]>;
}

/**
 * Configuration options for message publication.
 */
export interface MessageOptions {
  /**
   * Delay in seconds before the message is delivered.
   */
  delay?: number;

  /**
   * Unique ID for content-based deduplication.
   */
  deduplicationId?: string;

  /**
   * Number of retries for this specific message.
   */
  retries?: number;

  /**
   * HTTP headers to forward to the consumer.
   */
  headers?: Record<string, string>;
}