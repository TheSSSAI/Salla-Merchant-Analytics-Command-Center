import axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import http from 'http';
import https from 'https';
import { GatewayConfig } from '../../config/GatewayConfig';
import { RateLimitHandler } from './RateLimitHandler';
import { AuthInterceptors } from './AuthInterceptors';
import { GatewayException, GatewayErrorType } from '../../models/GatewayException';

/**
 * Factory responsible for creating and configuring Axios HTTP clients
 * with enterprise-grade resilience, performance optimizations, and security defaults.
 * 
 * Implements the Factory Pattern to abstract infrastructure concerns from Gateway implementations.
 */
export class HttpClientFactory {
    private readonly httpAgent: http.Agent;
    private readonly httpsAgent: https.Agent;

    /**
     * Initializes the factory with optimized HTTP agents for connection pooling.
     * 
     * @param rateLimitHandler - Service to handle API rate limiting logic
     * @param authInterceptors - Service to attach authentication logic
     */
    constructor(
        private readonly rateLimitHandler: RateLimitHandler,
        private readonly authInterceptors: AuthInterceptors
    ) {
        // Initialize Keep-Alive agents to reuse TCP connections and improve performance
        // This is critical for high-throughput gateway operations
        this.httpAgent = new http.Agent({
            keepAlive: true,
            maxSockets: 100,
            maxFreeSockets: 10,
            timeout: 60000
        });

        this.httpsAgent = new https.Agent({
            keepAlive: true,
            maxSockets: 100,
            maxFreeSockets: 10,
            timeout: 60000
        });
    }

    /**
     * Creates a specialized HTTP client for the Salla Platform API.
     * Configures base URL, timeouts, rate limiting, and default headers.
     * 
     * @returns A configured AxiosInstance ready for Salla API interactions
     */
    public createSallaClient(): AxiosInstance {
        const config = GatewayConfig.Salla;

        if (!config || !config.baseUrl) {
            throw new GatewayException(
                'Salla Gateway configuration is missing or incomplete.',
                GatewayErrorType.VALIDATION_ERROR
            );
        }

        const client = this.createBaseClient({
            baseURL: config.baseUrl,
            timeout: 30000, // 30s default timeout for Salla operations
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'SallaAnalytics-SDK/1.0.0'
            }
        });

        // Attach specialized rate limit handling for Salla's 429 responses
        this.rateLimitHandler.attachRateLimitInterceptor(client, 'salla');

        // Note: Authentication interceptors are typically attached by the SallaGateway 
        // passing a specific token provider, or we can attach a generic one here if 
        // the architecture dictates a single global auth strategy.
        // For this implementation, we ensure the client handles 401s via the AuthInterceptors helper.
        this.authInterceptors.attachUnauthorizedInterceptor(client);

        return client;
    }

    /**
     * Creates a specialized HTTP client for the Postmark API.
     * 
     * @returns A configured AxiosInstance ready for Postmark interactions
     */
    public createPostmarkClient(): AxiosInstance {
        // Assumption: GatewayConfig has a Postmark section or we use a default
        // In a real scenario, this would come from the centralized config
        const baseUrl = process.env.POSTMARK_BASE_URL || 'https://api.postmarkapp.com';

        const client = this.createBaseClient({
            baseURL: baseUrl,
            timeout: 10000, // Email operations should be fast
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // Postmark has different rate limiting headers, we attach a handler scoped to 'postmark'
        this.rateLimitHandler.attachRateLimitInterceptor(client, 'postmark');

        return client;
    }

    /**
     * Creates a specialized HTTP client for OpenAI interactions.
     * Note: While OpenAI interactions often use the official SDK, this client is provided
     * for raw HTTP operations or if the SDK is wrapped with custom transport.
     * 
     * @returns A configured AxiosInstance
     */
    public createOpenAIClient(): AxiosInstance {
        // OpenAI config usually comes from env/config class
        const baseUrl = 'https://api.openai.com/v1';

        const client = this.createBaseClient({
            baseURL: baseUrl,
            timeout: 60000, // AI operations can be slow
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.rateLimitHandler.attachRateLimitInterceptor(client, 'openai');
        
        return client;
    }

    /**
     * Creates a generic base client with shared infrastructure configuration.
     * Applies connection pooling and default serialization settings.
     * 
     * @param options - Specific Axios configuration overrides
     */
    private createBaseClient(options: CreateAxiosDefaults): AxiosInstance {
        const client = axios.create({
            ...options,
            httpAgent: this.httpAgent,
            httpsAgent: this.httpsAgent,
            // Enforce response type as JSON by default
            responseType: 'json',
            // Validate status: resolve only for 2xx, allows interceptors to handle others
            validateStatus: (status) => status >= 200 && status < 300,
        });

        // Attach global request logging (if logger were injected) or generic error wrapping
        this.attachGlobalErrorHandling(client);

        return client;
    }

    /**
     * Attaches global error handling to normalize Axios errors into GatewayExceptions.
     * This acts as a safety net before specific Gateway logic runs.
     */
    private attachGlobalErrorHandling(client: AxiosInstance): void {
        client.interceptors.response.use(
            (response) => response,
            (error) => {
                // If the error is already a GatewayException (e.g. from RateLimitHandler), rethrow
                if (error instanceof GatewayException) {
                    return Promise.reject(error);
                }

                if (axios.isAxiosError(error)) {
                    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                        return Promise.reject(new GatewayException(
                            `Request timed out: ${error.message}`,
                            GatewayErrorType.TIMEOUT,
                            error
                        ));
                    }

                    if (!error.response) {
                        // Network error
                        return Promise.reject(new GatewayException(
                            `Network error occurred: ${error.message}`,
                            GatewayErrorType.CIRCUIT_OPEN, // Treating network failures as circuit breakers/availability issues
                            error
                        ));
                    }

                    // 5xx Server Errors
                    if (error.response.status >= 500) {
                        return Promise.reject(new GatewayException(
                            `External service server error: ${error.response.status}`,
                            GatewayErrorType.CIRCUIT_OPEN, // Fail fast on server errors
                            error,
                            { status: error.response.status, data: error.response.data }
                        ));
                    }
                }

                // Return original error for other cases (4xx) to be handled by specific Gateways
                return Promise.reject(error);
            }
        );
    }
}