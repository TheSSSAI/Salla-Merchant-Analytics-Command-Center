import { EventType } from '../EventModels';

/**
 * Standardized Internal Event Envelope.
 * Wraps external events (webhooks) into a consistent format for internal processing.
 * This ensures the domain layer is decoupled from external provider shapes.
 * @template T The type of the payload.
 */
export class InternalEvent<T = any> {
  public readonly eventId: string;
  public readonly type: EventType;
  public readonly payload: T;
  public readonly source: string;
  public readonly timestamp: Date;
  public readonly merchantId: string;
  public readonly traceId?: string;

  /**
   * @param eventId Unique identifier for the event (UUID).
   * @param merchantId ID of the tenant owning this data.
   * @param type The classification of the event.
   * @param payload The actual data payload.
   * @param source The origin of the event (e.g., "salla.webhook", "system.sync").
   * @param traceId Optional distributed tracing identifier.
   */
  constructor(
    eventId: string,
    merchantId: string,
    type: EventType,
    payload: T,
    source: string,
    traceId?: string
  ) {
    if (!eventId) throw new Error('Event ID is required');
    if (!merchantId) throw new Error('Merchant ID is required');
    if (!type) throw new Error('Event Type is required');

    this.eventId = eventId;
    this.merchantId = merchantId;
    this.type = type;
    this.payload = payload;
    this.source = source;
    this.timestamp = new Date();
    this.traceId = traceId;
  }

  /**
   * Serializes the event to a JSON string.
   */
  public toString(): string {
    return JSON.stringify({
      id: this.eventId,
      type: this.type,
      source: this.source,
      merchantId: this.merchantId,
      timestamp: this.timestamp.toISOString(),
      payload: this.payload,
      traceId: this.traceId
    });
  }
}