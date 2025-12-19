import { AxiosInstance, isAxiosError } from 'axios';
import { GatewayConfig } from '../../config/GatewayConfig';
import { HttpClientFactory } from '../../infrastructure/http/HttpClientFactory';
import { GatewayResult } from '../../models/GatewayResult';
import { GatewayException, GatewayErrorType } from '../../models/GatewayException';
import { SallaOAuthResponse } from './SallaDTOs';

/**
 * Service responsible for handling the initial OAuth2 handshake with Salla.
 * Separated from the main Gateway to isolate authentication logic from data operations.
 */
export class SallaAuthService {
  private readonly client: AxiosInstance;
  private readonly config: typeof GatewayConfig;

  constructor() {
    this.config = GatewayConfig;
    // Create a public client without default auth interceptors for the token exchange
    this.client = HttpClientFactory.createPublicClient({
      baseURL: 'https://accounts.salla.sa/oauth2',
      timeout: 10000,
    });
  }

  /**
   * Exchanges an authorization code for access and refresh tokens.
   * 
   * @param code - The authorization code received from the Salla callback
   * @returns A result containing the token response or an error
   */
  public async exchangeCodeForToken(code: string): Promise<GatewayResult<SallaOAuthResponse>> {
    if (!code) {
      return GatewayResult.failure(
        new GatewayException(
          'Authorization code is required',
          GatewayErrorType.VALIDATION_ERROR
        )
      );
    }

    try {
      const payload = {
        client_id: this.config.salla.clientId,
        client_secret: this.config.salla.clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.config.salla.redirectUri,
        scope: 'offline_access', 
      };

      const response = await this.client.post<SallaOAuthResponse>('/token', payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return GatewayResult.success(response.data);
    } catch (error) {
      return this.handleAuthError(error);
    }
  }

  /**
   * Refreshes an expired access token using a refresh token.
   * 
   * @param refreshToken - The refresh token
   * @returns A result containing the new token response
   */
  public async refreshToken(refreshToken: string): Promise<GatewayResult<SallaOAuthResponse>> {
    if (!refreshToken) {
      return GatewayResult.failure(
        new GatewayException(
          'Refresh token is required',
          GatewayErrorType.VALIDATION_ERROR
        )
      );
    }

    try {
      const payload = {
        client_id: this.config.salla.clientId,
        client_secret: this.config.salla.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        redirect_uri: this.config.salla.redirectUri,
      };

      const response = await this.client.post<SallaOAuthResponse>('/token', payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return GatewayResult.success(response.data);
    } catch (error) {
      return this.handleAuthError(error);
    }
  }

  private handleAuthError(error: unknown): GatewayResult<any> {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      const errorData = error.response?.data;
      const errorMessage = errorData?.error_description || errorData?.error || error.message;

      if (status === 400 || status === 401) {
        return GatewayResult.failure(
          new GatewayException(
            `Authentication failed: ${errorMessage}`,
            GatewayErrorType.AUTHENTICATION_FAILED,
            { originalError: errorData }
          )
        );
      }

      if (status === 429) {
        return GatewayResult.failure(
          new GatewayException(
            'Rate limit exceeded during authentication',
            GatewayErrorType.RATE_LIMIT_EXCEEDED
          )
        );
      }

      if (error.code === 'ECONNABORTED') {
        return GatewayResult.failure(
          new GatewayException(
            'Authentication request timed out',
            GatewayErrorType.TIMEOUT
          )
        );
      }
    }

    return GatewayResult.failure(
      new GatewayException(
        'An unexpected error occurred during authentication',
        GatewayErrorType.UNKNOWN,
        { originalError: error }
      )
    );
  }
}