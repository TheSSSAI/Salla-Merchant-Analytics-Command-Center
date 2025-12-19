/**
 * Configuration contract for Salla Integration.
 */
export interface SallaConfig {
  /** The base URL for Salla Admin API (v2) */
  apiBaseUrl: string;
  /** The base URL for Salla OAuth2 endpoints */
  authBaseUrl: string;
  /** OAuth2 Client ID */
  clientId: string;
  /** OAuth2 Client Secret */
  clientSecret: string;
  /** Secret key used to verify HMAC signatures on incoming webhooks */
  webhookSecret: string;
  /** Default request timeout in milliseconds */
  timeoutMs: number;
  /** Internal rate limit settings to prevent 429s */
  rateLimit?: {
    maxRequests: number;
    windowMs: number;
  };
}

/**
 * Configuration contract for OpenAI Integration.
 */
export interface OpenAIConfig {
  /** OpenAI API Key */
  apiKey: string;
  /** Optional Organization ID */
  organizationId?: string;
  /** Model ID for Chat Completions (e.g., gpt-4-turbo) */
  chatModel: string;
  /** Model ID for Embeddings (e.g., text-embedding-3-small) */
  embeddingModel: string;
  /** Default request timeout in milliseconds */
  timeoutMs: number;
  /** Max retries for failed requests (5xx) */
  maxRetries: number;
}

/**
 * Configuration contract for Email (Postmark) Integration.
 */
export interface PostmarkConfig {
  /** Server API Token */
  serverToken: string;
  /** Account API Token (for domain management) */
  accountToken?: string;
  /** Default 'From' email address */
  defaultFromEmail: string;
  /** Default request timeout in milliseconds */
  timeoutMs: number;
}

/**
 * Global Configuration container for the Integration Library.
 * This should be populated by the consumer application from environment variables.
 */
export interface GatewayConfig {
  salla: SallaConfig;
  openai: OpenAIConfig;
  postmark: PostmarkConfig;
  /** Global circuit breaker settings */
  resilience?: {
    circuitBreaker: {
      failureThreshold: number;
      resetTimeoutMs: number;
    };
  };
}