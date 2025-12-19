/**
 * Domain Type Definitions
 * 
 * This file contains the foundational type definitions for the business domain,
 * utility configurations, and functional error handling patterns.
 * These types are used across the Clean Architecture layers to ensure 
 * type safety and consistency.
 * 
 * @module Types/Domain
 */

/**
 * Supported currency codes for the application.
 * Follows ISO 4217 standard.
 */
export enum CurrencyCode {
  USD = 'USD',
  SAR = 'SAR',
  EUR = 'EUR',
}

/**
 * Configuration options for the Logger Factory.
 * Defines the shape of logging configuration used across services.
 */
export interface LoggerOptions {
  /**
   * The minimum log level to output (e.g., 'debug', 'info', 'warn', 'error').
   */
  level: string;

  /**
   * The environment the logger is running in (e.g., 'development', 'production').
   * Determines default formatting (pretty vs JSON).
   */
  env: string;

  /**
   * The name of the service this logger belongs to.
   * Injected into log context for correlation.
   */
  serviceName: string;

  /**
   * Optional custom formatting configuration.
   * Specific to the underlying logging implementation (e.g., Winston/Pino).
   */
  format?: unknown;
}

/**
 * Base interface for all Domain Entities.
 * Enforces standard identity and audit fields.
 */
export interface BaseEntity {
  /**
   * Unique identifier for the entity (UUID v4).
   */
  id: string;

  /**
   * Timestamp when the entity was created (ISO 8601).
   */
  createdAt: string;

  /**
   * Timestamp when the entity was last updated (ISO 8601).
   */
  updatedAt: string;
}

/**
 * Represents a generic user in the system domain.
 * Used for type safety in cross-service communication.
 */
export interface IDomainUser extends BaseEntity {
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isActive: boolean;
}

/**
 * Represents a functional success result.
 */
export interface Success<T> {
  readonly _tag: 'Success';
  readonly value: T;
  
  /**
   * Helper to check if this result is a success.
   */
  isSuccess(): this is Success<T>;
  
  /**
   * Helper to check if this result is a failure.
   */
  isFailure(): this is Failure<never>;
}

/**
 * Represents a functional failure result.
 */
export interface Failure<E> {
  readonly _tag: 'Failure';
  readonly error: E;

  /**
   * Helper to check if this result is a success.
   */
  isSuccess(): this is Success<never>;

  /**
   * Helper to check if this result is a failure.
   */
  isFailure(): this is Failure<E>;
}

/**
 * Result type for functional error handling.
 * Encourages explicit error handling logic over try/catch blocks for domain logic.
 * 
 * @template T The type of the success value.
 * @template E The type of the error value (defaults to Error).
 */
export type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Helper class to construct Result objects.
 */
export class ResultFactory {
  /**
   * Creates a Success result.
   * @param value The success value.
   */
  static ok<T>(value: T): Success<T> {
    return {
      _tag: 'Success',
      value,
      isSuccess: () => true,
      isFailure: () => false,
    };
  }

  /**
   * Creates a Failure result.
   * @param error The error value.
   */
  static fail<E>(error: E): Failure<E> {
    return {
      _tag: 'Failure',
      error,
      isSuccess: () => false,
      isFailure: () => true,
    };
  }
}