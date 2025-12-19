import axios, { 
  AxiosInstance, 
  AxiosError, 
  InternalAxiosRequestConfig, 
  AxiosResponse 
} from 'axios';

/**
 * Interface for the queue of failed requests waiting for token refresh
 */
interface FailedRequestQueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

/**
 * Enterprise-grade HTTP Client Configuration
 * Implements the Silent Refresh pattern (Sequence 446) handling 401 errors transparently.
 */
class ApiClientFactory {
  private static instance: AxiosInstance;
  private static isRefreshing: boolean = false;
  private static failedQueue: FailedRequestQueueItem[] = [];

  /**
   * Processes the queue of failed requests after a refresh attempt.
   * @param error - The error that occurred during refresh, if any.
   */
  private static processQueue(error: Error | null = null): void {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve();
      }
    });
    this.failedQueue = [];
  }

  /**
   * Creates or returns the singleton Axios instance with interceptors configured.
   */
  public static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Critical for BFF Cookie-based auth
        timeout: 30000, // 30s timeout standard
      });

      this.setupInterceptors();
    }
    return this.instance;
  }

  /**
   * Configures Request and Response interceptors.
   */
  private static setupInterceptors(): void {
    // Request Interceptor: Optional logging or header injection if needed
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // In a cookie-based BFF, we don't manually attach Bearer tokens.
        // The browser handles the HttpOnly cookie.
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Response Interceptor: Handles global error states and Token Refresh
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry) {
          // Prevent infinite loops if the refresh endpoint itself is 401ing
          if (originalRequest.url?.includes('/auth/refresh')) {
            return Promise.reject(error);
          }

          if (this.isRefreshing) {
            // If already refreshing, queue this request
            return new Promise<void>((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(() => this.instance(originalRequest))
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            // Attempt to refresh the session via the BFF endpoint
            // This endpoint is expected to rotate the HttpOnly cookies
            await this.instance.post('/auth/refresh');
            
            // On success, process the queue and retry the original request
            this.processQueue();
            return this.instance(originalRequest);
          } catch (refreshError) {
            // If refresh fails, reject all queued requests and force logout/redirect
            this.processQueue(refreshError as Error);
            
            // Redirect to login on fatal auth failure
            // Using window.location to force a full page refresh and state clear
            if (typeof window !== 'undefined') {
              window.location.href = '/login?error=session_expired';
            }
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Handle generic errors (e.g., 500, 403, network)
        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  /**
   * Standardizes API error format for the application consumption.
   */
  private static handleApiError(error: AxiosError): Error {
    const errorData = error.response?.data as { message?: string; code?: string };
    const message = errorData?.message || error.message || 'An unexpected error occurred';
    
    // Can be extended to log to external monitoring service (e.g., Sentry)
    console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}:`, message);
    
    return new Error(message);
  }
}

// Export the singleton instance for direct use
export const apiClient = ApiClientFactory.getInstance();

// Export a helper to perform typed requests if needed
export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await apiClient.get<T>(url);
  return response.data;
};