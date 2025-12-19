import { ISignatureValidator } from '../domain/interfaces/ISignatureValidator';
import { IMessaging } from '../domain/interfaces/IMessaging';
import { InternalEvent } from '../domain/models/InternalEvent';
import { EventType } from '../domain/EventModels';
import { v4 as uuidv4 } from 'uuid';

/**
 * Application Service responsible for ingesting, validating, and queuing incoming Salla webhooks.
 * This service acts as the entry point for the Real-time CDC pipeline.
 */
export class IngestWebhookUseCase {
    private readonly _signatureValidator: ISignatureValidator;
    private readonly _messaging: IMessaging;

    /**
     * @param signatureValidator Service to verify the authenticity of the webhook
     * @param messaging Service to publish the validated event to the processing queue
     */
    constructor(
        signatureValidator: ISignatureValidator,
        messaging: IMessaging
    ) {
        this._signatureValidator = signatureValidator;
        this._messaging = messaging;
    }

    /**
     * Executes the ingestion process.
     * 1. Validates the webhook signature.
     * 2. Wraps the payload in an internal event envelope.
     * 3. Publishes the event to the asynchronous processing queue.
     * 
     * @param payload The raw body of the webhook request
     * @param signature The 'x-salla-signature' header value
     * @param eventTypeString The 'x-salla-event' header value
     * @throws Error if validation fails or queue publication fails
     */
    public async execute(payload: any, signature: string, eventTypeString: string): Promise<void> {
        // 1. Security: Validate Signature
        if (!payload || !signature) {
            throw new Error('Invalid webhook request: Missing payload or signature.');
        }

        const isValid = this._signatureValidator.validate(payload, signature);
        if (!isValid) {
            console.error('[IngestWebhookUseCase] Signature validation failed.');
            throw new Error('Unauthorized: Invalid Webhook Signature.');
        }

        // 2. Map Event Type
        const eventType = this.mapEventType(eventTypeString);
        if (eventType === EventType.UNKNOWN) {
            console.warn(`[IngestWebhookUseCase] Received unhandled event type: ${eventTypeString}`);
            return; // Acknowledge but do not process unknown events
        }

        // 3. Create Internal Event Envelope
        // We use the 'data' field from Salla's standard webhook structure, or the root if not present
        const eventData = payload.data || payload; 
        
        const internalEvent: InternalEvent = {
            eventId: uuidv4(),
            type: eventType,
            payload: eventData,
            timestamp: new Date(),
            merchantId: payload.merchant || eventData.merchant?.id // Attempt to extract merchant context
        };

        // 4. Publish to QStash for Asynchronous Processing
        try {
            await this._messaging.publish('process-event', internalEvent);
            console.log(`[IngestWebhookUseCase] Successfully queued event ${internalEvent.eventId} of type ${internalEvent.type}`);
        } catch (error) {
            console.error('[IngestWebhookUseCase] Failed to publish event to queue:', error);
            throw new Error('Internal Server Error: Failed to queue event.');
        }
    }

    /**
     * Maps the string event type from the webhook header to the Domain Enum.
     */
    private mapEventType(typeString: string): EventType {
        switch (typeString) {
            case 'order.created':
                return EventType.ORDER_CREATED;
            case 'order.updated':
                return EventType.ORDER_UPDATED;
            case 'cart.abandoned':
                return EventType.CART_ABANDONED;
            case 'customer.created':
            case 'customer.updated':
                return EventType.CUSTOMER_UPDATED;
            case 'product.created':
            case 'product.updated':
                return EventType.PRODUCT_UPDATED;
            default:
                return EventType.UNKNOWN;
        }
    }
}