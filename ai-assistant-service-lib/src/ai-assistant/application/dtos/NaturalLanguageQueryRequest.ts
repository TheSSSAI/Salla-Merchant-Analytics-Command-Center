/**
 * Data Transfer Object for the incoming natural language query request.
 */
export class NaturalLanguageQueryRequest {
  constructor(
    public readonly query: string,
    public readonly merchantId: string,
    public readonly timestamp: Date = new Date()
  ) {
    if (!query || query.trim().length === 0) {
      throw new Error("Query text cannot be empty.");
    }
    if (!merchantId) {
      throw new Error("Merchant ID is required for data scoping.");
    }
  }
}