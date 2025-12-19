import { IInsightRule } from './IInsightRule';
import { InsightResult } from '../dtos/InsightResult';
import { InsightType } from '../../domain/Insight';

// Interface defining the expected input data shape for this rule
interface ProductPerformanceMetric {
  productId: string;
  productName: string;
  addToCartCount: number;
  purchaseCount: number;
  conversionRate: number; // percentage (0-100)
}

export class HighAddToCartLowConversionRule implements IInsightRule {
  private readonly ADD_TO_CART_THRESHOLD = 50; // Minimum add-to-carts to be considered significant
  private readonly CONVERSION_RATE_THRESHOLD = 2.0; // Conversion rate below this % is considered low

  /**
   * Evaluates product data to identify items with high interest but low sales conversion.
   * @param data Array of ProductPerformanceMetric
   */
  public async evaluate(data: any): Promise<InsightResult | null> {
    if (!Array.isArray(data)) {
      return null;
    }

    const products = data as ProductPerformanceMetric[];
    
    // Filter for products matching criteria
    // 1. High volume of interest (Add to carts)
    // 2. Low conversion rate
    const problematicProducts = products.filter(p => 
      p.addToCartCount >= this.ADD_TO_CART_THRESHOLD && 
      p.conversionRate <= this.CONVERSION_RATE_THRESHOLD
    );

    if (problematicProducts.length === 0) {
      return null;
    }

    // Sort by "missed opportunity" (Add to carts - Purchases) to find the most impactful one
    problematicProducts.sort((a, b) => 
      (b.addToCartCount - b.purchaseCount) - (a.addToCartCount - a.purchaseCount)
    );

    const topProduct = problematicProducts[0];

    return new InsightResult(
      InsightType.SUGGESTION,
      `Optimization Opportunity: Product Conversion`,
      `Product "${topProduct.productName}" is frequently added to carts (${topProduct.addToCartCount} times) but rarely purchased (Conversion Rate: ${topProduct.conversionRate.toFixed(1)}%). Consider reviewing its price, shipping costs, or product page description to reduce friction.`,
      {
        productId: topProduct.productId,
        metric: 'conversion_rate',
        currentValue: topProduct.conversionRate,
        threshold: this.CONVERSION_RATE_THRESHOLD
      }
    );
  }
}