import { InternalEvent } from './models/InternalEvent';
import { SallaWebhookEvent, EventType, SUPPORTED_SALLA_EVENTS } from './EventModels';

/**
 * Domain Service responsible for the Anti-Corruption Layer (ACL) logic.
 * Maps external Salla Webhook payloads into normalized internal Domain Events.
 * Ensures that the application core interacts only with trusted, standardized data structures.
 */
export class SallaEventMapper {
  /**
   * Maps a raw Salla webhook payload to a normalized InternalEvent.
   * 
   * @param rawPayload The raw JSON body received from the Salla webhook.
   * @param eventName The event name header (e.g., 'order.created').
   * @returns A normalized InternalEvent ready for processing.
   * @throws Error if the payload is malformed or the event type is unsupported.
   */
  public toDomainEvent(rawPayload: any, eventName: string): InternalEvent {
    this.validatePayload(rawPayload);
    
    const eventType = this.mapEventType(eventName);
    const merchantId = this.extractMerchantId(rawPayload);
    const eventId = this.extractEventId(rawPayload);
    const timestamp = this.extractTimestamp(rawPayload);

    // Deep freeze the payload to ensure immutability within the domain
    const normalizedPayload = Object.freeze(rawPayload.data);

    return new InternalEvent(
      eventId,
      eventType,
      merchantId,
      normalizedPayload,
      timestamp
    );
  }

  /**
   * Validates the structural integrity of the incoming payload.
   */
  private validatePayload(payload: any): void {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid payload: Payload must be a non-null object.');
    }

    if (!payload.event) {
      throw new Error('Invalid payload: Missing "event" field.');
    }

    if (!payload.merchant || !payload.merchant.id) {
      throw new Error('Invalid payload: Missing merchant identifier.');
    }

    if (!payload.data) {
      throw new Error('Invalid payload: Missing "data" object.');
    }
  }

  /**
   * Maps external Salla event strings to internal EventType enum.
   */
  private mapEventType(eventName: string): EventType {
    // Direct mapping check
    if (this.isSupportedEvent(eventName)) {
      return eventName as EventType;
    }

    // Fallback/Normalization logic if Salla changes naming conventions slightly
    // This allows the ACL to absorb minor external changes without breaking the core
    const normalized = eventName.toLowerCase().trim();
    if (this.isSupportedEvent(normalized)) {
      return normalized as EventType;
    }

    throw new Error(`Unsupported event type: ${eventName}`);
  }

  private isSupportedEvent(event: string): event is EventType {
    return Object.values(SUPPORTED_SALLA_EVENTS).includes(event as any);
  }

  /**
   * Extracts the Merchant ID, converting it to the internal string format.
   */
  private extractMerchantId(payload: any): string {
    return String(payload.merchant.id);
  }

  /**
   * Extracts a unique event ID for idempotency. 
   * Uses payload ID if available, otherwise relies on the calling context to generate one
   * or throws if strict tracing is required.
   */
  private extractEventId(payload: any): string {
    // Salla webhooks often include an 'id' in the root or data
    if (payload.id) return String(payload.id);
    
    // Fallback to a hash or timestamp if absolutely necessary, 
    // but preferably we want a deterministic ID from the source.
    // For specific events like order.created, data.id is the entity ID, not the event ID.
    // We assume the webhook delivery ID is passed via headers usually, 
    // but if mapped from body, we use what is available.
    
    // If no distinct event ID is present, we generate a synthetic one based on entity ID + event type
    // This ensures that receiving the same order update multiple times generates the same ID for idempotency
    if (payload.data && payload.data.id) {
      return `${payload.event}-${payload.data.id}`;
    }

    throw new Error('Unable to extract or generate a unique Event ID from payload.');
  }

  /**
   * Parses the timestamp from the payload or defaults to current time.
   */
  private extractTimestamp(payload: any): Date {
    if (payload.created_at) {
      const date = new Date(payload.created_at);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    
    if (payload.data && payload.data.date) {
      const date = new Date(payload.data.date);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }

    // Default to processing time if source time is missing/invalid
    return new Date();
  }
}