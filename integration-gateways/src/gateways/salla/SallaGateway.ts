import { AxiosInstance, isAxiosError } from 'axios';
import { ISallaGateway } from '../../contracts/ISallaGateway';
import { GatewayResult } from '../../models/GatewayResult';
import { GatewayException, GatewayErrorType } from '../../models/GatewayException';
import { HttpClientFactory } from '../../infrastructure/http/HttpClientFactory';
import { SallaMapper } from './SallaMapper';
import { OrderSearchCriteria, SallaOrderResponse, SallaMerchantProfileResponse } from './SallaDTOs';
import { RateLimitHandler } from '../../infrastructure/http/RateLimitHandler';
import { GatewayConfig } from '../../config/GatewayConfig';

/**
 * Implementation of the Salla Gateway using Axios.
 * Acts as an Anti-Corruption Layer (ACL) by mapping external DTOs to internal entities.
 * Enforces rate limiting and standardized error handling.
 */
export class SallaGateway implements ISallaGateway {
  private readonly client: AxiosInstance;
  private readonly mapper: SallaMapper;
  private readonly rateLimiter: RateLimitHandler;

  constructor() {
    // Initialize the authenticated client factory
    // Note: The factory is expected to attach AuthInterceptors that handle token injection
    this.client = HttpClientFactory.createAuthenticatedClient({
      baseURL: GatewayConfig.salla.baseUrl,
      timeout: 15000, // 15 seconds for data operations
    });
    
    this.mapper = new SallaMapper();
    this.rateLimiter = new RateLimitHandler();
  }

  /**
   * Fetches a list of orders from Salla based on criteria.
   * 
   * @param criteria - Search parameters (date range, pagination cursor)
   * @returns List of mapped Order entities
   */
  public async fetchOrders(criteria: OrderSearchCriteria): Promise<GatewayResult<any[]>> {
    return this.executeProtectedOperation(async () => {
      // 1. Build Query Parameters
      const params = this.buildOrderQueryParams(criteria);

      // 2. Execute Request with Rate Limiting
      const response = await this.rateLimiter.execute(async () => {
        return this.client.get<SallaOrderResponse>('/orders', { params });
      });

      // 3. Map to Domain Entities
      // The mapper handles schema validation via Zod internally
      const orders = response.data.data.map(orderDto => 
        this.mapper.toDomainOrder(orderDto)
      );

      // Return raw data wrapper to include pagination metadata if needed by the consumer
      // In a strict DDD implementation, we might return a specific PaginatedList<Order>
      return orders;
    }, 'fetchOrders');
  }

  /**
   * Retrieves the authenticated merchant's profile.
   * Used for onboarding and validation.
   */
  public async getMerchantProfile(): Promise<GatewayResult<any>> {
    return this.executeProtectedOperation(async () => {
      const response = await this.rateLimiter.execute(async () => {
        return this.client.get<SallaMerchantProfileResponse>('/oauth2/user/info');
      });

      return this.mapper.toDomainMerchantProfile(response.data.data);
    }, 'getMerchantProfile');
  }

  /**
   * Standardized wrapper for executing gateway operations.
   * Handles error mapping and logging.
   */
  private async executeProtectedOperation<T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<GatewayResult<T>> {
    try {
      const result = await operation();
      return GatewayResult.success(result);
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        
        if (status === 401 || status === 403) {
          return GatewayResult.failure(
            new GatewayException(
              `Unauthorized access during ${operationName}. Token may be expired.`,
              GatewayErrorType.AUTHENTICATION_FAILED,
              { status }
            )
          );
        }

        if (status === 429) {
          // RateLimitHandler should catch most, but if one slips through
          return GatewayResult.failure(
            new GatewayException(
              `Rate limit exceeded during ${operationName}`,
              GatewayErrorType.RATE_LIMIT_EXCEEDED
            )
          );
        }

        if (status && status >= 500) {
          return GatewayResult.failure(
            new GatewayException(
              `Salla server error during ${operationName}`,
              GatewayErrorType.UPSTREAM_ERROR,
              { status }
            )
          );
        }
        
        if (error.code === 'ECONNABORTED') {
          return GatewayResult.failure(
            new GatewayException(
              `Request timed out during ${operationName}`,
              GatewayErrorType.TIMEOUT
            )
          );
        }
      }

      // Handle mapping errors or other unexpected exceptions
      if (error instanceof Error && error.name === 'ZodError') {
        return GatewayResult.failure(
          new GatewayException(
            `Data contract violation in ${operationName}`,
            GatewayErrorType.CONTRACT_VIOLATION,
            { details: error.message }
          )
        );
      }

      return GatewayResult.failure(
        new GatewayException(
          `Unexpected error in ${operationName}: ${(error as Error).message}`,
          GatewayErrorType.UNKNOWN
        )
      );
    }
  }

  private buildOrderQueryParams(criteria: OrderSearchCriteria): Record<string, any> {
    const params: Record<string, any> = {};

    if (criteria.fromDate) {
      params.from_date = criteria.fromDate.toISOString();
    }
    
    if (criteria.toDate) {
      params.to_date = criteria.toDate.toISOString();
    }

    if (criteria.cursor) {
      params.page = criteria.cursor; // Salla often uses 'page' or specific cursor param
    }

    if (criteria.status) {
      params.status = criteria.status;
    }

    // Default to a reasonable page size if not specified
    params.per_page = criteria.limit || 50;

    return params;
  }
}