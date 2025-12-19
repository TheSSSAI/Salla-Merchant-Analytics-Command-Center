/**
 * Configuration Service for the Data Pipeline.
 * Validates and exposes environment variables required for the service to function.
 * Adheres to the "Fail Fast" principle by throwing errors on startup if config is missing.
 */
export class ServiceConfig {
  private static instance: ServiceConfig;

  // Environment Variables
  public readonly sallaClientSecret: string;
  public readonly clickHouseUrl: string;
  public readonly clickHouseUser: string;
  public readonly clickHousePassword: string;
  public readonly qstashUrl: string;
  public readonly qstashToken: string;
  public readonly qstashCurrentSigningKey: string;
  public readonly qstashNextSigningKey: string;
  public readonly openAiApiKey: string;
  public readonly pineconeApiKey: string;
  public readonly pineconeIndex: string;
  public readonly databaseUrl: string; // Postgres
  public readonly appUrl: string; // Base URL for self-referencing webhooks

  private constructor() {
    this.sallaClientSecret = this.getEnv('SALLA_CLIENT_SECRET');
    this.clickHouseUrl = this.getEnv('CLICKHOUSE_URL');
    this.clickHouseUser = this.getEnv('CLICKHOUSE_USER', 'default');
    this.clickHousePassword = this.getEnv('CLICKHOUSE_PASSWORD');
    this.qstashUrl = this.getEnv('QSTASH_URL');
    this.qstashToken = this.getEnv('QSTASH_TOKEN');
    this.qstashCurrentSigningKey = this.getEnv('QSTASH_CURRENT_SIGNING_KEY');
    this.qstashNextSigningKey = this.getEnv('QSTASH_NEXT_SIGNING_KEY');
    this.openAiApiKey = this.getEnv('OPENAI_API_KEY');
    this.pineconeApiKey = this.getEnv('PINECONE_API_KEY');
    this.pineconeIndex = this.getEnv('PINECONE_INDEX');
    this.databaseUrl = this.getEnv('DATABASE_URL'); // Prisma
    this.appUrl = this.getEnv('APP_URL');
  }

  /**
   * Singleton accessor.
   */
  public static getInstance(): ServiceConfig {
    if (!ServiceConfig.instance) {
      ServiceConfig.instance = new ServiceConfig();
    }
    return ServiceConfig.instance;
  }

  /**
   * Helper to fetch env var with validation.
   * @param key The environment variable name.
   * @param fallback Optional fallback value.
   * @throws Error if the variable is missing and no fallback is provided.
   */
  private getEnv(key: string, fallback?: string): string {
    const value = process.env[key];
    if (!value) {
      if (fallback !== undefined) {
        return fallback;
      }
      throw new Error(`CRITICAL CONFIGURATION ERROR: Environment variable ${key} is missing.`);
    }
    return value;
  }

  /**
   * Checks if the environment is production.
   */
  public get isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }
}

// Export a singleton instance for direct use
export const config = ServiceConfig.getInstance();