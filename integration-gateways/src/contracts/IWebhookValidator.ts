/**
 * Contract for validating the security signatures of incoming webhooks.
 * Used to ensure requests originate from the expected provider (e.g., Salla).
 */
export interface IWebhookValidator {
  /**
   * Validates the cryptographic signature of an incoming webhook payload.
   * 
   * @param payload - The raw stringified body of the webhook request.
   * @param signature - The signature hash provided in the request headers.
   * @returns true if the signature is valid, false otherwise.
   */
  validateSignature(payload: string, signature: string): boolean;
}