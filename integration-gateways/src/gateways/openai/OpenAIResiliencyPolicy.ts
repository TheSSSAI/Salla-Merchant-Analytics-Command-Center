import { 
    Policy, 
    ConsecutiveBreaker, 
    ExponentialBackoff, 
    ICircuitBreaker, 
    IRetryPolicy,
    handleAll,
    IMolicy
} from 'cockatiel';
import { GatewayException, GatewayErrorType } from '../../models/GatewayException';

/**
 * OpenAIResiliencyPolicy
 * 
 * Defines the Circuit Breaker and Retry policies specifically for OpenAI interactions.
 * This ensures the system remains stable even if OpenAI experiences latency or outages.
 * 
 * Pattern: Circuit Breaker + Retry
 */
export class OpenAIResiliencyPolicy {
    private readonly circuitBreaker: ICircuitBreaker;
    private readonly retryPolicy: IRetryPolicy;
    private readonly combinedPolicy: IMolicy;

    constructor() {
        // Define what constitutes a failure that should trigger the breaker
        // We handle generic Errors and specific GatewayExceptions
        const failureCriteria = handleAll;

        // Circuit Breaker Configuration
        // Break if 3 consecutive failures occur.
        // Stay open for 30 seconds before allowing a half-open test request.
        this.circuitBreaker = Policy
            .handleAll()
            .circuitBreaker(
                10 * 1000, // 10 seconds sampling duration (Cockatiel v3 syntax variation handling)
                new ConsecutiveBreaker(3)
            );
        
        // Ensure breaker resets happen (Cockatiel specific config might vary by version, 
        // assuming standard break duration setup)
        // Note: For Cockatiel v3, the sampling duration is the first arg, strategy second.
        // The break duration is often configured on the breaker object or strategy.
        // Adjusting for standard usage:
        // .circuitBreaker(halfOpenAfter, breakerStrategy)
        // Let's use a robust configuration:
        // Open for 30 seconds after 3 failures.
        this.circuitBreaker = Policy
            .handleAll()
            .circuitBreaker(30 * 1000, new ConsecutiveBreaker(3));

        this.circuitBreaker.onBreak((context) => {
            console.warn(`OpenAI Circuit Breaker OPEN due to ${context.lastFailure?.message}`);
        });

        this.circuitBreaker.onReset(() => {
            console.info('OpenAI Circuit Breaker CLOSED (Recovered)');
        });

        // Retry Policy Configuration
        // Retry 3 times with exponential backoff for transient errors
        // Initial delay 200ms, max delay 10s
        this.retryPolicy = Policy
            .handleAll()
            .retry()
            .attempts(3)
            .exponential({ initialDelay: 200, maxDelay: 10000 });

        // Wrap Retry inside Circuit Breaker
        // Order matters: We want to retry transient errors BEFORE tripping the breaker.
        // However, usually Circuit Breaker wraps the operation globally. 
        // If we wrap Retry(Circuit(Op)), the breaker sees all retries.
        // If we wrap Circuit(Retry(Op)), the breaker sees the final failure of the retry policy.
        // We choose Circuit(Retry(Op)) so transient glitches don't trip the breaker immediately.
        this.combinedPolicy = Policy.wrap(this.circuitBreaker, this.retryPolicy);
    }

    /**
     * Executes a function within the resiliency policy context.
     * 
     * @param operation The async operation to execute (e.g., API call)
     * @returns The result of the operation
     * @throws GatewayException if all retries fail or circuit is open
     */
    public async execute<T>(operation: () => Promise<T>): Promise<T> {
        try {
            return await this.combinedPolicy.execute(operation);
        } catch (error: any) {
            // Check if error is due to Broken Circuit
            if (error.message && error.message.includes('circuit breaker is open')) {
                throw new GatewayException(
                    'OpenAI Service Unavailable (Circuit Breaker Open)',
                    GatewayErrorType.CIRCUIT_OPEN,
                    { originalError: error }
                );
            }

            // If it's already a typed exception, rethrow
            if (error instanceof GatewayException) {
                throw error;
            }

            // Otherwise wrap unknown errors
            throw new GatewayException(
                'OpenAI Request Failed after retries',
                GatewayErrorType.UNKNOWN,
                { originalError: error }
            );
        }
    }

    /**
     * Explicitly get the circuit breaker state for monitoring.
     */
    public getCircuitState(): 'Closed' | 'Open' | 'Half-Open' {
        return this.circuitBreaker.state as 'Closed' | 'Open' | 'Half-Open';
    }
}