/**
 * Data Transfer Objects (DTOs) for Salla API interactions.
 * These interfaces represent the external data structure contract.
 */

// --- Request DTOs ---

export interface SallaPaginationOptions {
  /** Page number for cursor-based or offset-based pagination */
  page?: number;
  /** Number of items per page */
  perPage?: number;
  /** Next cursor token if Salla API supports cursor pagination */
  cursor?: string;
}

export interface OrderSearchCriteria {
  /** Filter orders created after this date */
  fromDate?: Date;
  /** Filter orders created before this date */
  toDate?: Date;
  /** Filter by order status (e.g., 'created', 'completed') */
  status?: string;
  /** Pagination options */
  pagination?: SallaPaginationOptions;
  /** Include updated orders since timestamp (for CDC/Sync) */
  updatedAfter?: Date;
}

// --- Response DTOs ---

export interface SallaPaginationMeta {
  count: number;
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  links?: {
    next?: string;
    previous?: string;
  };
}

export interface PaginatedSallaResponse<T> {
  status: number;
  success: boolean;
  data: T[];
  pagination: SallaPaginationMeta;
}

export interface SallaCustomerDTO {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  mobile_code: string;
  email: string;
  gender?: string;
  city?: string;
  country?: string;
  avatar?: string;
}

export interface SallaProductDTO {
  id: number;
  name: string;
  price: number;
  currency: string;
  sku?: string;
  quantity?: number; // In order context
}

export interface SallaOrderItemDTO {
  id: number;
  product: SallaProductDTO;
  quantity: number;
  total: {
    amount: number;
    currency: string;
  };
  options?: Array<{
    name: string;
    value: string;
  }>;
}

export interface SallaOrderDTO {
  id: number;
  reference_id: string; // The visible order ID (e.g., #1001)
  date: {
    date: string; // ISO format
    timezone_type: number;
    timezone: string;
  };
  status: {
    id: number;
    name: string;
    slug: string; // 'created', 'completed', etc.
  };
  payment_method: string;
  currency: string;
  amounts: {
    sub_total: number;
    shipping_cost: number;
    tax: number;
    total: number;
  };
  customer: SallaCustomerDTO;
  items: SallaOrderItemDTO[];
  shipping?: {
    address?: {
      city?: string;
      country?: string;
      street?: string;
    };
  };
}

export interface MerchantProfileDTO {
  id: number;
  name: string;
  username: string;
  email: string;
  mobile: string;
  avatar: string;
  store_location?: {
    city?: string;
    country?: string;
  };
  plan: {
    id: number;
    name: string;
  };
  status: string;
  created_at: string;
}

// --- Auth DTOs ---

export interface OAuthTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}