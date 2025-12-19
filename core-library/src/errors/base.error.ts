/**
 * Base Error Definition
 * 
 * This file defines the abstract base class for all application-specific errors.
 * It provides a consistent structure for error reporting, including HTTP status code mapping,
 * operational vs. programming error distinction, and serialization support.
 * 
 * @module Errors/Base
 */

/**
 * Abstract base class for all custom errors in the application.
 * Extends the native JavaScript Error class.
 */
export abstract class BaseError extends Error {
  /**
   * The HTTP status code associated with this error.
   * Used by error handling middleware to determine the response status.
   */
  public readonly statusCode: number;

  /**
   * Indicates if the error is operational (expected) or programming (unexpected).
   * Operational errors (e.g., validation failed, not found) usually don't require app restart.
   * Programming errors (e.g., null pointer) might require process restart/alerting.
   */
  public readonly isOperational: boolean;

  /**
   * A machine-readable error code.
   */
  public readonly code: string;

  /**
   * Optional additional details about the error.
   */
  public readonly details?: unknown;

  /**
   * Constructor for BaseError.
   * 
   * @param message - Human-readable error message.
   * @param statusCode - HTTP status code (default: 500).
   * @param code - Machine-readable error code (default: 'INTERNAL_SERVER_ERROR').
   * @param isOperational - Whether this is a known operational error (default: true).
   * @param details - Optional additional context.
   */
  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_SERVER_ERROR',
    isOperational: boolean = true,
    details?: unknown
  ) {
    super(message);

    // Set the prototype explicitly to restore the prototype chain.
    // This is necessary when extending built-ins like Error in TypeScript/ES6.
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;

    // Capture the stack trace, excluding the constructor call from it.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // Set the name of the error to the class name.
    this.name = this.constructor.name;
  }

  /**
   * Serializes the error to a plain object.
   * Useful for logging or sending the error in an API response.
   * 
   * @param includeStack - Whether to include the stack trace (should be false in production).
   * @returns A plain object representation of the error.
   */
  public toJSON(includeStack: boolean = false): Record<string, unknown> {
    const json: Record<string, unknown> = {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      isOperational: this.isOperational,
    };

    if (this.details !== undefined) {
      json.details = this.details;
    }

    if (includeStack && this.stack) {
      json.stack = this.stack;
    }

    return json;
  }

  /**
   * Converts the error to a string representation.
   */
  public override toString(): string {
    return `${this.name} [${this.code}]: ${this.message}`;
  }
}