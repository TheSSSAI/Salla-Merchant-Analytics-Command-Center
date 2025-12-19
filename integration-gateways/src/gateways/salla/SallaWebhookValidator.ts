import * as crypto from 'crypto';
import { IWebhookValidator } from '../../contracts/IWebhookValidator';
import { GatewayConfig } from '../../config/GatewayConfig'; // Assuming Level 0 config exists

/**
 * SallaWebhookValidator
 * 
 * Implements security validation for incoming Salla Webhooks.
 * Uses HMAC-SHA256 signature verification with constant-time comparison
 * to prevent timing attacks.
 * 
 * Reference: REQ-INT-006 (Security)
 */
export class SallaWebhookValidator implements IWebhookValidator {
    private readonly secret: string;

    constructor(config: { webhookSecret: string }) {
        if (!config.webhookSecret) {
            // We don't throw here to allow instantiation, but validation will fail.
            // Ideally, this should be validated at config load time.
            console.warn('SallaWebhookValidator initialized without a secret key.');
        }
        this.secret = config.webhookSecret;
    }

    /**
     * Validates the authenticity of a webhook request.
     * 
     * @param payload The raw string body of the request
     * @param signature The signature string from the 'Authorization' or specific Salla header
     * @returns true if valid, false otherwise
     */
    public validateSignature(payload: string, signature: string): boolean {
        if (!this.secret) {
            console.error('Webhook secret is not configured.');
            return false;
        }

        if (!payload || !signature) {
            return false;
        }

        try {
            // Salla signatures usually behave like standard HMAC-SHA256
            // Signature format might be just the hash or "sha256=<hash>"
            // We assume standard hex digest matching Salla's documentation.
            
            const hmac = crypto.createHmac('sha256', this.secret);
            hmac.update(payload);
            const calculatedSignature = hmac.digest('hex');

            // Handle cases where signature might be prefixed (e.g., "sha256=")
            // If Salla sends specific prefix, strip it here. 
            // Assuming raw hex for now based on standard integrations.
            
            // Convert both to Buffers for constant-time comparison
            const signatureBuffer = Buffer.from(signature);
            const calculatedBuffer = Buffer.from(calculatedSignature);

            // Length check is a prerequisite for timingSafeEqual
            if (signatureBuffer.length !== calculatedBuffer.length) {
                return false;
            }

            return crypto.timingSafeEqual(signatureBuffer, calculatedBuffer);
        } catch (error) {
            console.error('Error validating webhook signature:', error);
            return false;
        }
    }
}