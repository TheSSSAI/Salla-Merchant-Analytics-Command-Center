import { BaseError } from './base.error';

/**
 * Interface representing a specific field validation error.
 */
export interface ValidationErrorDetail {
  /**
   * The name of the field that failed validation (e.g., "email", "password").
   */
  field: string;
  
  /**
   * A human-readable error message describing the validation failure.
   */
  message: string;
  
  /**
   * Optional validation error code for programmatic handling (e.g., "invalid_email").
   */
  code?: string;
  
  /**
   * The value that caused the validation error (use with caution regarding PII).
   */
  received?: unknown;
}

/**
 * Error thrown when input data fails to match expected schemas or business rules.
 * Maps to HTTP 400 Bad Request.
 */
export class ValidationError extends BaseError {
  public readonly details: ValidationErrorDetail[];

  /**
   * @param message - The general error message.
   * @param details - An array of specific field validation errors.
   */
  constructor(
    message: string = 'Validation failed',
    details: ValidationErrorDetail[] = []
  ) {
    // HTTP 400 Bad Request, marked as operational (client error)
    super(message, 400, true);
    
    this.name = 'ValidationError';
    this.details = details;

    // Restore prototype chain for proper instanceof checks
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  /**
   * Serializes the error details into a structured object for API responses.
   */
  public override toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}