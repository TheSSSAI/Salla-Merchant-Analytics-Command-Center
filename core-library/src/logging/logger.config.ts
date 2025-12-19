import { LoggerOptions } from '../types/domain.types';

/**
 * Factory class for generating standardized logging configurations.
 * Ensures consistent observability across all microservices.
 * Supports environment-aware formatting (JSON for prod, Pretty for dev).
 */
export class LoggerConfigFactory {
  /**
   * Creates a logger configuration object compatible with Winston/Pino.
   * 
   * @param serviceName - The identifier of the service (e.g., 'auth-service')
   * @param env - The runtime environment ('development', 'production', 'test')
   * @returns LoggerOptions configuration object
   */
  public static createConfig(serviceName: string, env: string): LoggerOptions {
    const isProduction = env === 'production';
    const isDevelopment = env === 'development';

    // Default Log Level Logic
    // Production: Info (reduce noise)
    // Development: Debug (verbose)
    // Test: Error (silent except failures)
    let logLevel = 'info';
    if (isDevelopment) logLevel = 'debug';
    if (env === 'test') logLevel = 'error';

    // Redaction List - Fields that should never appear in logs
    const redactKeys = [
      'password',
      'token',
      'accessToken',
      'refreshToken',
      'authorization',
      'creditCard',
      'cvv',
      'secret',
      'apiKey'
    ];

    const config: LoggerOptions = {
      level: logLevel,
      // In production, we enforce JSON for log ingestion systems (ELK, Datadog, Axiom)
      // In development, we allow pretty printing for developer experience
      format: isProduction ? { type: 'json' } : { type: 'pretty', colorize: true },
      
      // Default Metadata injected into every log entry
      defaultMeta: {
        service: serviceName,
        environment: env,
        nodeVersion: process.version,
      },

      // Transport/Output configuration would typically go here in a full winston config,
      // but LoggerOptions interface defines the shape. 
      // We assume the consuming service initializes the actual library with this config.
      
      // Redaction configuration (implementation specific, usually handled by transport or formatter)
      redact: redactKeys
    };

    return config;
  }

  /**
   * Helper to determine if a log level is enabled.
   * 
   * @param configuredLevel - The current log level
   * @param targetLevel - The level to check
   * @returns boolean
   */
  public static isLevelEnabled(configuredLevel: string, targetLevel: string): boolean {
    const levels = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'];
    const configIndex = levels.indexOf(configuredLevel);
    const targetIndex = levels.indexOf(targetLevel);
    
    // Lower index means higher priority in standard npm logging levels
    return targetIndex <= configIndex;
  }
}