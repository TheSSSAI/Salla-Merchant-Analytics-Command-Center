import { GatewayException, GatewayErrorType } from '../../models/GatewayException';

/**
 * Interface representing the state of Rate Limits for a specific resource context.
 */
export interface RateLimitState {
    limit: number;
    remaining: number;
    resetAt: number; // Timestamp in milliseconds
}

/**
 * RateLimitHandler
 * 
 * Handles proactive and reactive rate limiting for HTTP requests.
 * Uses a Token Bucket inspired approach updated by server response headers.
 * 
 * Designed to prevent "429 Too Many Requests" errors by tracking quotas
 * and delaying requests when near exhaustion.
 */
export class RateLimitHandler {
    // Map to store rate limit state per endpoint/resource key (if needed) or global
    // Salla typically applies limits per Access Token (Merchant)
    private limits: Map<string, RateLimitState> = new Map();
    
    // Default safety buffer (percentage of limit to reserve)
    private readonly BUFFER_THRESHOLD = 0.05; 

    /**
     * Checks if a request can proceed based on the current rate limit state.
     * If the limit is exhausted, it calculates the wait time.
     * 
     * @param contextKey A unique key for the rate limit scope (e.g., 'salla:merchant_123')
     */
    public async checkAvailability(contextKey: string): Promise<void> {
        const state = this.limits.get(contextKey);

        if (!state) {
            // No state recorded yet, assume safe to proceed (First request)
            return;
        }

        const now = Date.now();

        // If we passed the reset time, reset the local counter assumption
        if (now >= state.resetAt) {
            // We can't strictly reset 'remaining' to 'limit' without server confirmation,
            // but we can allow the request to proceed to get new headers.
            return;
        }

        // Check if we have remaining requests
        if (state.remaining <= 0) {
            const waitTime = state.resetAt - now;
            if (waitTime > 0) {
                // If wait time is reasonable (e.g., < 1 minute), we might wait.
                // Otherwise, throw exception to let the caller handle backoff/queueing.
                if (waitTime < 10000) { // 10 seconds max proactive wait
                    await this.delay(waitTime + 100); // Add small buffer
                    return;
                }
                
                throw new GatewayException(
                    `Rate limit exhausted for ${contextKey}. Resets in ${Math.ceil(waitTime / 1000)}s`,
                    GatewayErrorType.RATE_LIMIT_EXCEEDED,
                    { resetAt: new Date(state.resetAt) }
                );
            }
        }
    }

    /**
     * Updates the internal rate limit state based on response headers.
     * 
     * Common Headers:
     * - X-RateLimit-Limit
     * - X-RateLimit-Remaining
     * - X-RateLimit-Reset (Often Unix timestamp)
     * 
     * @param contextKey Unique key for the scope
     * @param headers HTTP Response Headers
     */
    public updateFromHeaders(contextKey: string, headers: any): void {
        if (!headers) return;

        // Normalize header keys (lowercase)
        const limitHeader = headers['x-ratelimit-limit'];
        const remainingHeader = headers['x-ratelimit-remaining'];
        const resetHeader = headers['x-ratelimit-reset'];

        if (limitHeader && remainingHeader && resetHeader) {
            const limit = parseInt(limitHeader, 10);
            const remaining = parseInt(remainingHeader, 10);
            const resetTimestamp = parseInt(resetHeader, 10) * 1000; // Convert sec to ms

            this.limits.set(contextKey, {
                limit,
                remaining,
                resetAt: resetTimestamp
            });
        }
    }

    /**
     * Explicitly decrement the local counter.
     * Used when we send a request but haven't received headers yet (optimistic tracking).
     */
    public decrementRemaining(contextKey: string): void {
        const state = this.limits.get(contextKey);
        if (state && state.remaining > 0) {
            state.remaining--;
            this.limits.set(contextKey, state);
        }
    }

    /**
     * Utility to delay execution
     */
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}