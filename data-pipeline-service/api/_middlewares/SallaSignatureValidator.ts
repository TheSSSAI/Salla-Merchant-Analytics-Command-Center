import { ISignatureValidator } from '../../src/domain/interfaces/ISignatureValidator';
import { SallaGateway } from '../../src/infrastructure/SallaGateway';

/**
 * SallaSignatureValidator
 * 
 * Middleware utility to verify that incoming webhooks originate from Salla.
 * Wraps the logic contained in the Infrastructure Gateway to be used in API routes.
 */
export class SallaSignatureValidator implements ISignatureValidator {
  private gateway: SallaGateway;

  constructor() {
    // We instantiate the gateway here purely for its utility method
    // In a full DI container this would be injected
    this.gateway = new SallaGateway();
  }

  /**
   * Validates the request signature.
   * 
   * @param payload The raw body payload (stringified JSON)
   * @param signature The signature string from headers
   * @returns boolean
   */
  public validate(payload: any, signature: string): boolean {
    // Ideally, payload should be the raw string for HMAC. 
    // If 'payload' passed here is already an object, caller must pass raw string.
    // Assuming implementation details of SallaGateway.validateWebhookSignature handle string.
    
    let contentToCheck = payload;
    
    // Ensure we are working with a string representation for hashing
    if (typeof payload !== 'string') {
      try {
        contentToCheck = JSON.stringify(payload);
      } catch (e) {
        console.error('Failed to stringify payload for validation', e);
        return false;
      }
    }

    return this.gateway.validateWebhookSignature(signature, contentToCheck);
  }
}