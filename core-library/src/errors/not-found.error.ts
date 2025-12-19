import { BaseError } from './base.error';

/**
 * Error thrown when a requested resource cannot be found in the system.
 * Maps to HTTP 404 Not Found.
 */
export class NotFoundError extends BaseError {
  public readonly resourceName: string;
  public readonly identifier?: string | number;

  /**
   * @param resourceName - The name of the resource type (e.g., "User", "Order").
   * @param identifier - The specific ID or key used to lookup the resource.
   */
  constructor(resourceName: string, identifier?: string | number) {
    const message = identifier
      ? `${resourceName} with identifier "${identifier}" was not found.`
      : `${resourceName} was not found.`;

    // HTTP 404 Not Found, marked as operational
    super(message, 404, true);

    this.name = 'NotFoundError';
    this.resourceName = resourceName;
    this.identifier = identifier;

    // Restore prototype chain for proper instanceof checks
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  /**
   * Serializes the error metadata for API responses.
   */
  public override toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      resourceName: this.resourceName,
      identifier: this.identifier,
    };
  }
}