/**
 * Data Transfer Object representing a row in the Analytical (OLAP) SalesFact table.
 * This structure is optimized for ClickHouse wide-table schemas.
 * It is denormalized to include all necessary dimensions for reporting.
 */
export interface SalesFactDTO {
  // --- Identifiers ---
  /** Unique ID of the order */
  orderId: string;
  /** ID of the merchant tenant */
  merchantId: string;
  /** ID of the customer who placed the order */
  customerId: string;
  /** Composite key for idempotency (e.g., orderId + itemId for line items) */
  factId: string;

  // --- Time Dimensions ---
  /** ISO 8601 timestamp of the event/order creation */
  eventDateTime: string;
  /** Date part for partitioning (YYYY-MM-DD) */
  eventDate: string;
  /** Hour of day (0-23) for hourly aggregation */
  hourOfDay: number;
  /** Day of week (1-7) */
  dayOfWeek: number;

  // --- Metrics (Measures) ---
  /** Total revenue for this fact (e.g., order total or line item total) */
  revenue: number;
  /** Quantity of items sold */
  quantity: number;
  /** Discount amount applied */
  discountAmount: number;
  /** Tax amount */
  taxAmount: number;
  /** Shipping cost */
  shippingCost: number;
  /** Net profit (if cost data available) */
  netProfit?: number;

  // --- Dimensions ---
  /** Current status of the order (e.g., "completed", "pending") */
  orderStatus: string;
  /** Currency code (e.g., "SAR", "USD") */
  currency: string;
  /** Payment method used */
  paymentMethod: string;
  
  // --- Product Dimensions (Denormalized) ---
  /** ID of the product */
  productId?: string;
  /** Name of the product */
  productName?: string;
  /** Category of the product */
  category?: string;
  /** SKU of the product */
  sku?: string;

  // --- Customer Dimensions (Denormalized) ---
  /** Customer's city */
  customerCity?: string;
  /** Customer's country */
  customerCountry?: string;
  /** Is this a new or returning customer */
  customerType: 'New' | 'Returning' | 'Guest';
}