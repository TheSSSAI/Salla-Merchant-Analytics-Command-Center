import OpenAI from 'openai';
import { IOpenAIGateway } from '../../contracts/IOpenAIGateway';
import { GatewayResult } from '../../models/GatewayResult';
import { GatewayException, GatewayErrorType } from '../../models/GatewayException';
import { OpenAIResiliencyPolicy } from './OpenAIResiliencyPolicy';
import { GatewayConfig } from '../../config/GatewayConfig';

/**
 * Gateway for interacting with OpenAI API.
 * Implements security (PII scrubbing) and resiliency (Circuit Breaker) patterns.
 */
export class OpenAIGateway implements IOpenAIGateway {
  private readonly sdkClient: OpenAI;
  private readonly resiliencyPolicy: OpenAIResiliencyPolicy;

  constructor() {
    this.sdkClient = new OpenAI({
      apiKey: GatewayConfig.openai.apiKey,
      maxRetries: 0, // We handle retries via our policy
      timeout: 30000, // 30s timeout
    });
    this.resiliencyPolicy = new OpenAIResiliencyPolicy();
  }

  /**
   * Generates a text completion based on a prompt and optional context.
   * 
   * @param prompt - The user's query
   * @param context - Optional RAG context to include
   */
  public async generateCompletion(prompt: string, context?: string): Promise<GatewayResult<string>> {
    // 1. Security: Scrub PII before any processing
    const safePrompt = this.scrubPII(prompt);
    const safeContext = context ? this.scrubPII(context) : '';

    return this.executeWithResilience(async () => {
      // 2. Construct Messages
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: 'You are a helpful business analytics assistant. Use the provided context to answer the user query.'
        }
      ];

      if (safeContext) {
        messages.push({
          role: 'system',
          content: `Context data: ${safeContext}`
        });
      }

      messages.push({
        role: 'user',
        content: safePrompt
      });

      // 3. Execute SDK Call
      const completion = await this.sdkClient.chat.completions.create({
        model: 'gpt-4-turbo-preview', // Or configurable via GatewayConfig
        messages: messages,
        temperature: 0.2, // Low temperature for analytical accuracy
      });

      const answer = completion.choices[0]?.message?.content;

      if (!answer) {
        throw new Error('OpenAI returned an empty response');
      }

      return answer;
    });
  }

  /**
   * Generates vector embeddings for a given text.
   * 
   * @param text - The text to embed
   */
  public async generateEmbedding(text: string): Promise<GatewayResult<number[]>> {
    // 1. Security: Scrub PII
    const safeText = this.scrubPII(text);

    return this.executeWithResilience(async () => {
      // 2. Execute SDK Call
      const response = await this.sdkClient.embeddings.create({
        model: 'text-embedding-3-small',
        input: safeText,
        encoding_format: 'float',
      });

      const embedding = response.data[0]?.embedding;

      if (!embedding) {
        throw new Error('OpenAI returned no embedding data');
      }

      return embedding;
    });
  }

  /**
   * Wraps operations in the resiliency policy (Circuit Breaker + Retry).
   */
  private async executeWithResilience<T>(operation: () => Promise<T>): Promise<GatewayResult<T>> {
    try {
      // The policy executes the operation and handles retries/circuit state
      const result = await this.resiliencyPolicy.execute(operation);
      return GatewayResult.success(result);
    } catch (error: any) {
      // Map specific errors
      if (error.name === 'BrokenCircuitError') {
        return GatewayResult.failure(
          new GatewayException(
            'OpenAI service is temporarily unavailable (Circuit Open)',
            GatewayErrorType.CIRCUIT_OPEN
          )
        );
      }

      if (error instanceof OpenAI.APIError) {
        if (error.status === 429) {
          return GatewayResult.failure(
            new GatewayException(
              'OpenAI rate limit exceeded',
              GatewayErrorType.RATE_LIMIT_EXCEEDED
            )
          );
        }
        if (error.status === 401) {
          return GatewayResult.failure(
            new GatewayException(
              'OpenAI authentication failed',
              GatewayErrorType.AUTHENTICATION_FAILED
            )
          );
        }
      }

      return GatewayResult.failure(
        new GatewayException(
          `OpenAI operation failed: ${error.message}`,
          GatewayErrorType.UPSTREAM_ERROR,
          { originalError: error }
        )
      );
    }
  }

  /**
   * Basic PII Scrubber to remove emails and phone numbers.
   * In a real enterprise system, this would be more sophisticated or use a specialized library.
   */
  private scrubPII(text: string): string {
    if (!text) return '';
    
    // Redact Emails
    const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
    let scrubbed = text.replace(emailRegex, '[EMAIL_REDACTED]');

    // Redact Phone Numbers (Basic International Format)
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    scrubbed = scrubbed.replace(phoneRegex, '[PHONE_REDACTED]');

    return scrubbed;
  }
}