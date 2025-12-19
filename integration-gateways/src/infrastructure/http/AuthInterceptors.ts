import { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { GatewayException, GatewayErrorType } from '../../models/GatewayException';

/**
 * Interface definition for a Token Provider.
 * This decouples the interceptor logic from the actual Auth Service (Level 3),
 * adhering to strict dependency layering.
 */
export interface ITokenProvider {
    getAccessToken(): Promise<string | null>;
    refreshAccessToken(): Promise<string>;
}

/**
 * AuthInterceptors
 * 
 * Provides static methods to attach authentication and token refresh logic
 * to an Axios instance.
 * 
 * Implements the Interceptor Pattern.
 */
export class AuthInterceptors {
    
    /**
     * Attaches the Request Interceptor that injects the Bearer token.
     * 
     * @param axiosInstance The Axios instance to configure
     * @param tokenProvider The provider strategy for fetching the current token
     */
    public static attachRequestInterceptor(
        axiosInstance: AxiosInstance, 
        tokenProvider: ITokenProvider
    ): void {
        axiosInstance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                try {
                    // Check if the request explicitly skips auth (custom config prop)
                    // @ts-ignore - custom property
                    if (config.skipAuth) {
                        return config;
                    }

                    const token = await tokenProvider.getAccessToken();
                    
                    if (token) {
                        config.headers.set('Authorization', `Bearer ${token}`);
                    }
                    
                    return config;
                } catch (error) {
                    throw new GatewayException(
                        'Failed to inject authorization header',
                        GatewayErrorType.AUTHENTICATION_FAILED,
                        { originalError: error }
                    );
                }
            },
            (error) => Promise.reject(error)
        );
    }

    /**
     * Attaches the Response Interceptor that handles 401 Unauthorized errors
     * by attempting to refresh the token and retry the original request.
     * 
     * Includes logic to prevent "Token Stampedes" (multiple parallel refreshes).
     * 
     * @param axiosInstance The Axios instance to configure
     * @param tokenProvider The provider strategy for refreshing tokens
     */
    public static attachResponseInterceptor(
        axiosInstance: AxiosInstance,
        tokenProvider: ITokenProvider
    ): void {
        // State to track if a refresh is currently in progress
        let isRefreshing = false;
        // Queue for requests that fail while refreshing is happening
        let failedQueue: Array<{
            resolve: (value: unknown) => void;
            reject: (reason?: any) => void;
        }> = [];

        const processQueue = (error: any, token: string | null = null) => {
            failedQueue.forEach(prom => {
                if (error) {
                    prom.reject(error);
                } else {
                    prom.resolve(token);
                }
            });
            failedQueue = [];
        };

        axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

                // If error is not 401 or request already retried, reject immediately
                if (!error.response || error.response.status !== 401 || originalRequest._retry) {
                    // Wrap in GatewayException for consistency if it's an API error
                    if (error.response) {
                        return Promise.reject(new GatewayException(
                            `API Error: ${error.response.status} ${error.response.statusText}`,
                            this.mapStatusToErrorType(error.response.status),
                            { 
                                statusCode: error.response.status,
                                data: error.response.data 
                            }
                        ));
                    }
                    return Promise.reject(error);
                }

                if (isRefreshing) {
                    // If refreshing, queue this request to be retried once refresh completes
                    return new Promise(function(resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        if (originalRequest.headers) {
                            originalRequest.headers.set('Authorization', `Bearer ${token}`);
                        }
                        return axiosInstance(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const newToken = await tokenProvider.refreshAccessToken();
                    
                    // Update header for the original failed request
                    if (originalRequest.headers) {
                        originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
                    }
                    
                    // Process any queued requests with the new token
                    processQueue(null, newToken);
                    
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    // If refresh fails, fail all queued requests
                    processQueue(refreshError, null);
                    
                    return Promise.reject(new GatewayException(
                        'Token refresh failed. Authentication required.',
                        GatewayErrorType.AUTHENTICATION_FAILED,
                        { originalError: refreshError }
                    ));
                } finally {
                    isRefreshing = false;
                }
            }
        );
    }

    private static mapStatusToErrorType(status: number): GatewayErrorType {
        switch (status) {
            case 401: return GatewayErrorType.AUTHENTICATION_FAILED;
            case 403: return GatewayErrorType.AUTHENTICATION_FAILED;
            case 429: return GatewayErrorType.RATE_LIMIT_EXCEEDED;
            case 400: return GatewayErrorType.VALIDATION_ERROR;
            case 408: return GatewayErrorType.TIMEOUT;
            case 504: return GatewayErrorType.TIMEOUT;
            default: return GatewayErrorType.UNKNOWN;
        }
    }
}