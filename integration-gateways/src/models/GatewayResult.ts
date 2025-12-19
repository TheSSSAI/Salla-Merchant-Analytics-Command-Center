import { GatewayException } from './GatewayException';

/**
 * Encapsulates the result of a Gateway operation, adhering to the Result pattern.
 * Forces consumers to handle success and failure states explicitly.
 */
export class GatewayResult<T> {
  private constructor(
    public readonly isSuccess: boolean,
    private readonly _data?: T,
    private readonly _error?: GatewayException
  ) {}

  /**
   * Creates a successful result containing data.
   * @param data - The data returned by the operation
   */
  static success<T>(data: T): GatewayResult<T> {
    return new GatewayResult<T>(true, data, undefined);
  }

  /**
   * Creates a failure result containing an exception.
   * @param error - The exception describing the failure
   */
  static failure<T>(error: GatewayException): GatewayResult<T> {
    return new GatewayResult<T>(false, undefined, error);
  }

  /**
   * Retrieves the data if successful, otherwise throws the error.
   * Useful for scenarios where throwing is preferred over checking status.
   * @throws GatewayException if isSuccess is false
   */
  getOrThrow(): T {
    if (this.isSuccess) {
      return this._data as T;
    }
    throw this._error;
  }

  /**
   * Safely accesses the data. 
   * @returns The data if successful, otherwise undefined.
   */
  get data(): T | undefined {
    return this._data;
  }

  /**
   * Safely accesses the error.
   * @returns The error if failed, otherwise undefined.
   */
  get error(): GatewayException | undefined {
    return this._error;
  }
}