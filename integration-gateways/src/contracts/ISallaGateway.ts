import { GatewayResult } from '../models/GatewayResult';
import { 
  OrderSearchCriteria, 
  SallaOrderDTO, 
  PaginatedSallaResponse, 
  MerchantProfileDTO 
} from '../gateways/salla/SallaDTOs';

/**
 * Contract for the Salla Platform Gateway.
 * Abstracts all interactions with the Salla Admin API.
 */
export interface ISallaGateway {
  /**
   * Fetches orders from Salla based on the provided search criteria.
   * Handles pagination transparency or returns a paginated result structure.
   * 
   * @param criteria - Filters for date range, status, and pagination options.
   * @returns A Promise resolving to a GatewayResult containing the paginated order response.
   */
  fetchOrders(criteria: OrderSearchCriteria): Promise<GatewayResult<PaginatedSallaResponse<SallaOrderDTO>>>;

  /**
   * Retrieves the current authenticated merchant's profile.
   * Used for validating the connection and retrieving merchant metadata.
   * 
   * @returns A Promise resolving to a GatewayResult containing the merchant profile.
   */
  getMerchantProfile(): Promise<GatewayResult<MerchantProfileDTO>>;

  /**
   * Fetches a single order by its ID.
   * 
   * @param orderId - The Salla Order ID.
   * @returns A Promise resolving to a GatewayResult containing the order details.
   */
  getOrderById(orderId: string): Promise<GatewayResult<SallaOrderDTO>>;
}