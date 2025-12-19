/**
 * Defines the domain event types and structures supported by the pipeline.
 * Acts as a registry for all event-driven interactions within the system.
 */

/**
 * Enumeration of all supported event types in the system.
 * Corresponds to Salla webhook topics and internal system events.
 */
export enum EventType {
  // Salla Webhook Events
  ORDER_CREATED = 'order.created',
  ORDER_UPDATED = 'order.updated',
  ORDER_DELETED = 'order.deleted',
  PRODUCT_CREATED = 'product.created',
  PRODUCT_UPDATED = 'product.updated',
  CUSTOMER_CREATED = 'customer.created',
  CUSTOMER_UPDATED = 'customer.updated',
  CART_ABANDONED = 'cart.abandoned', // Synthetic or specific webhook

  // Internal System Events
  SYNC_JOB_TRIGGERED = 'system.sync.triggered',
  SYNC_PAGE_COMPLETED = 'system.sync.page_completed',
  SYNC_JOB_COMPLETED = 'system.sync.completed',
  SYNC_JOB_FAILED = 'system.sync.failed',
  
  // Data Pipeline Events
  DATA_TRANSFORMED = 'pipeline.data.transformed',
  VECTOR_EMBEDDING_GENERATED = 'pipeline.vector.generated'
}

/**
 * Payload definition for Order events.
 */
export interface OrderEventPayload {
  id: string;
  reference_id?: string;
  date: string;
  status: string;
  payment_method: string;
  currency: string;
  total: {
    amount: number;
    currency: string;
  };
  customer: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    city: string;
    country: string;
  };
  items: Array<{
    id: string;
    product_id: string;
    name: string;
    quantity: number;
    amounts: {
      total: { amount: number; currency: string };
    };
  }>;
}

/**
 * Payload definition for Product events.
 */
export interface ProductEventPayload {
  id: string;
  name: string;
  sku: string;
  price: {
    amount: number;
    currency: string;
  };
  category_id?: string;
  description?: string;
}

/**
 * Payload definition for Historical Sync jobs.
 */
export interface SyncJobPayload {
  jobId: string;
  merchantId: string;
  depth: '12_months' | '24_months';
  resource: 'orders' | 'products' | 'customers';
  page: number;
  limit: number;
}