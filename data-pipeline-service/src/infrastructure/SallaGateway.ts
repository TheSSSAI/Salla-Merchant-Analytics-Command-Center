import axios, { AxiosInstance } from 'axios';
import { ServiceConfig } from '../config/ServiceConfig';
import crypto from 'crypto';

/**
 * SallaGateway
 * 
 * Adapter for interacting with the Salla E-commerce Platform API.
 * Handles authentication, fetching orders for sync, and low-level signature validation.
 */
export class SallaGateway {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://api.salla.dev/admin/v2',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Fetches a page of orders for a specific merchant.
   * Used during the Initial Historical Sync (FR-104).
   * 
   * @param accessToken The merchant's OAuth access token
   * @param page Page number to fetch
   * @param dateFrom Optional date filter (ISO string)
   */
  public async fetchOrders(accessToken: string, page: number = 1, dateFrom?: string): Promise<{ orders: any[]; pagination: any }> {
    try {
      const params: Record<string, any> = {
        page: page,
        per_page: 50, // Reasonable batch size
      };

      if (dateFrom) {
        params.date_from = dateFrom;
      }

      const response = await this.httpClient.get('/orders', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        params: params,
      });

      if (response.status !== 200) {
        throw new Error(`Salla API returned status ${response.status}`);
      }

      return {
        orders: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      console.error('Salla API FetchOrders Error:', error);
      // Handle token expiration specifically if needed (401)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Salla Authorization Failed: Invalid Token');
      }
      throw new Error(`Failed to fetch orders from Salla: ${(error as Error).message}`);
    }
  }

  /**
   * Validates the HMAC-SHA256 signature of an incoming Salla webhook.
   * 
   * @param signature The signature from the 'x-salla-signature' header
   * @param content The raw stringified body of the request
   * @returns boolean indicating validity
   */
  public validateWebhookSignature(signature: string, content: string): boolean {
    const webhookSecret = ServiceConfig.sallaWebhookSecret;
    
    if (!webhookSecret) {
      console.warn('Salla Webhook Secret is not configured.');
      return false;
    }

    try {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(content)
        .digest('hex');

      // Use timingSafeEqual to prevent timing attacks
      const sourceBuffer = Buffer.from(signature);
      const targetBuffer = Buffer.from(expectedSignature);

      if (sourceBuffer.length !== targetBuffer.length) {
        return false;
      }

      return crypto.timingSafeEqual(sourceBuffer, targetBuffer);
    } catch (error) {
      console.error('Signature Validation Error:', error);
      return false;
    }
  }
}