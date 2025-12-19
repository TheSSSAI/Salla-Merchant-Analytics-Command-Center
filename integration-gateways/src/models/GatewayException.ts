export enum GatewayErrorType {
  /** API rate limit exceeded (429) */
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  /** Authentication credentials invalid or expired (401/403) */
  AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED",
  /** Request timed out locally or remotely (408/504) */
  TIMEOUT = "TIMEOUT",
  /** Circuit breaker is open, request prevented */
  CIRCUIT_OPEN = "CIRCUIT_OPEN",
  /** Input validation failed or response schema mismatch */
  VALIDATION_ERROR = "VALIDATION_ERROR",
  /** External provider returned 5xx error */
  PROVIDER_ERROR = "PROVIDER_ERROR",
  /** Network connectivity issue */
  NETWORK_ERROR = "NETWORK_ERROR",
  /** Internal library error */
  INTERNAL_ERROR = "INTERNAL_ERROR",
  /** Resource not found (404) */
  NOT_FOUND = "NOT_FOUND",
  /** Request was malformed (400) */
  BAD_REQUEST = "BAD_REQUEST"
}

/**
 * Standardized exception class for all Gateway operations.
 * Wraps low-level HTTP/Library errors into a unified domain-agnostic format.
 */
export class GatewayException extends Error {
  /**
   * @param type - Categorized error type for control flow logic
   * @param message - Human-readable error message
   * @param originalError - The original error object (e.g., AxiosError), if available
   * @param retryable - Whether the operation might succeed if retried
   * @param context - Additional debugging metadata
   */
  constructor(
    public readonly type: GatewayErrorType,
    message: string,
    public readonly originalError?: unknown,
    public readonly retryable: boolean = false,
    public readonly context: Record<string, any> = {}
  ) {
    super(message);
    this.name = 'GatewayException';
    
    // Ensure prototype chain is correctly restored
    Object.setPrototypeOf(this, GatewayException.prototype);
    
    // Capture stack trace if supported (V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GatewayException);
    }
  }

  /**
   * Helper to check if the error was caused by a specific issue type.
   */
  public isType(type: GatewayErrorType): boolean {
    return this.type === type;
  }

  /**
   * Serializes the exception for logging purposes.
   */
  public toJSON(): Record<string, any> {
    return {
      name: this.name,
      type: this.type,
      message: this.message,
      retryable: this.retryable,
      context: this.context,
      originalError: this.originalError instanceof Error 
        ? { name: this.originalError.name, message: this.originalError.message, stack: this.originalError.stack }
        : this.originalError
    };
  }
}