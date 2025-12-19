/**
 * Interface for Cryptographic Signature Validation.
 * Crucial for securing inbound webhooks from external platforms (e.g., Salla).
 */
export interface ISignatureValidator {
  /**
   * Validates the authenticity of a payload using a provided signature.
   * @param payload The raw body of the request.
   * @param signature The signature string provided in the request headers.
   * @param secret The shared secret key used to generate the signature (optional if injected).
   * @returns True if the signature is valid, false otherwise.
   */
  validate(payload: any, signature: string, secret?: string): boolean;
}