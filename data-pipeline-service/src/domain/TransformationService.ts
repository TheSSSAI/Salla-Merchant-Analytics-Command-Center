import { InternalEvent } from './models/InternalEvent';
import { SalesFactDTO } from './models/SalesFactDTO';
import { EventType } from './EventModels';

/**
 * Domain Service responsible for transforming normalized InternalEvents into 
 * Analytical Data Transfer Objects (DTOs) optimized for OLAP storage (ClickHouse).
 * 
 * This service implements the business logic for:
 * 1. Flattening hierarchical order data into denormalized facts.
 * 2. Calculating derived metrics (Net Revenue, Discounts).
 * 3. Sanitizing textual data for downstream AI processing.
 */
export class TransformationService {
  
  /**
   * Transforms an order-related event into a list of SalesFactDTOs.
   * This denormalizes the order: one Order with N items becomes N SalesFact rows.
   * 
   * @param event The normalized internal event.
   * @returns Array of SalesFactDTOs ready for insertion.
   */
  public transformToSalesFacts(event: InternalEvent): SalesFactDTO[] {
    this.validateEventForSalesTransformation(event);

    const order = event.payload;
    const facts: SalesFactDTO[] = [];
    const eventDate = event.timestamp;

    // Handle Order Created / Updated
    if (!order.items || !Array.isArray(order.items)) {
      // If there are no items (e.g. status update only), we might still want to record the order status change.
      // However, for SalesFact usually we track line items. 
      // If purely tracking status, we might generate a single fact with null product details or handle in a separate table.
      // For this implementation, we assume we want full snapshots or we skip.
      if (event.type === 'order.updated') {
        // Logic for update: often in OLAP we just insert a new row with the new state (ReplacingMergeTree handles dedupe)
        // or we treat it as a new event in the stream.
        // We will process if items are present.
        return []; 
      }
      throw new Error(`Order payload missing items array for event ${event.eventId}`);
    }

    for (const item of order.items) {
      const fact = new SalesFactDTO();
      
      // Dimensional Data
      fact.eventDateTime = eventDate;
      fact.merchantId = event.merchantId;
      fact.orderId = String(order.id);
      fact.customerId = order.customer ? String(order.customer.id) : '';
      fact.customerEmail = order.customer ? this.sanitizeEmail(order.customer.email) : '';
      
      // Geographic Dimensions
      fact.customerCountry = order.shipping?.country || order.customer?.country || 'Unknown';
      fact.customerCity = order.shipping?.city || order.customer?.city || 'Unknown';

      // Product Dimensions
      fact.productId = String(item.product.id);
      fact.productName = item.product.name;
      // Handle potential category list
      fact.categoryId = (item.product.categories && item.product.categories.length > 0) 
        ? String(item.product.categories[0].id) 
        : '';
      fact.categoryName = (item.product.categories && item.product.categories.length > 0) 
        ? item.product.categories[0].name 
        : 'Uncategorized';

      // Metrics
      fact.quantity = Number(item.quantity) || 0;
      
      // Revenue Calculation Logic
      // Assuming item.amounts.total includes tax/discount distribution logic from Salla
      // If not, business logic for pro-rating order-level discounts would go here.
      fact.revenue = Number(item.amounts?.total?.amount || 0);
      
      // Status
      fact.orderStatus = order.status?.slug || order.status || 'unknown';
      fact.paymentMethod = order.payment_method || 'unknown';

      // Metadata for RAG
      fact.metadata = {
        currency: order.currency,
        promotionCode: order.promotion_code || null,
        isGuest: !order.customer?.id
      };

      facts.push(fact);
    }

    return facts;
  }

  /**
   * Prepares textual data from the event for Vector Embedding.
   * Removes PII and formats the text to be semantic-search friendly.
   * 
   * @param event The internal event.
   * @returns Sanitized string suitable for OpenAI embedding.
   */
  public prepareForEmbedding(event: InternalEvent): string | null {
    const payload = event.payload;

    if (event.type === 'product.created' || event.type === 'product.updated') {
      return this.formatProductText(payload);
    }

    // We typically don't embed raw orders for semantic search unless aggregating reviews/notes.
    // However, if we need to search "Orders with red shoes", we might embed order summaries.
    if (event.type === 'order.created') {
        return this.formatOrderSummary(payload);
    }

    return null;
  }

  private validateEventForSalesTransformation(event: InternalEvent): void {
    const validTypes: EventType[] = ['order.created', 'order.updated'];
    if (!validTypes.includes(event.type)) {
      throw new Error(`Invalid event type for SalesFact transformation: ${event.type}`);
    }
  }

  /**
   * Formats product data into a natural language string.
   */
  private formatProductText(product: any): string {
    const name = product.name || '';
    const description = this.stripHtml(product.description || '');
    const categories = product.categories?.map((c: any) => c.name).join(', ') || '';
    const brand = product.brand?.name || '';

    return `Product: ${name}. Brand: ${brand}. Category: ${categories}. Description: ${description}. Price: ${product.price?.amount} ${product.price?.currency}.`;
  }

  /**
   * Formats order summary without PII.
   */
  private formatOrderSummary(order: any): string {
    const items = order.items?.map((i: any) => `${i.quantity}x ${i.product.name}`).join(', ');
    const total = `${order.amounts?.total?.amount} ${order.currency}`;
    const status = order.status?.name || order.status;
    
    return `Order ${order.id} placed. Items: ${items}. Total Value: ${total}. Status: ${status}.`;
  }

  /**
   * Utility to strip HTML tags from descriptions.
   */
  private stripHtml(html: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
  }

  /**
   * PII Sanitization - Basic email masking.
   * Usually keeps domain for analytics (e.g. corporate vs gmail).
   */
  private sanitizeEmail(email: string): string {
    if (!email) return '';
    const parts = email.split('@');
    if (parts.length !== 2) return 'invalid-email';
    
    const [local, domain] = parts;
    const maskedLocal = local.length > 2 
      ? `${local.substring(0, 2)}***` 
      : `${local}***`;
      
    return `${maskedLocal}@${domain}`;
  }
}