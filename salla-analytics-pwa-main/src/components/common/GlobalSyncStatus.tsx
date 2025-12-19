"use client";

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { AlertCircle, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import { SyncState } from '@/types/sync';
import { apiClient } from '@/lib/api-client';

/**
 * Global Sync Status Component (US-015, US-012)
 * 
 * Displays a persistent progress indicator for the data synchronization process.
 * Integrates with the backend API to poll for status updates and provides
 * visual feedback for Running, Completed, and Failed states.
 * 
 * Designed to be mounted in the root or dashboard layout.
 */
const GlobalSyncStatus: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Define fetcher for SWR using the Level 2 api-client
  const fetcher = (url: string) => apiClient.get<SyncState>(url).then((res) => res.data);

  // Poll every 5 seconds if running, otherwise slow down or stop
  const { data, error, mutate } = useSWR<SyncState>(
    '/api/sync/status',
    fetcher,
    {
      refreshInterval: (data) => (data?.status === 'RUNNING' ? 5000 : 0),
      revalidateOnFocus: true,
      shouldRetryOnError: false
    }
  );

  useEffect(() => {
    // Logic to determine visibility based on status
    if (!data) return;

    if (data.status === 'RUNNING') {
      setIsVisible(true);
      setDismissed(false); // Force show if running
    } else if (data.status === 'FAILED') {
      setIsVisible(true);
    } else if (data.status === 'COMPLETED' && !dismissed) {
      // Show completed state briefly or until dismissed
      setIsVisible(true);
      // Auto-dismiss after 10 seconds if completed
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [data, dismissed]);

  // Handle retry action for failed sync
  const handleRetry = async () => {
    try {
      await apiClient.post('/api/sync/restart', {});
      // Immediately revalidate to update UI to pending/running
      mutate();
    } catch (err) {
      console.error('Failed to restart sync:', err);
      // In a real app, trigger a toast notification here
    }
  };

  if (!isVisible || !data) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm animate-in slide-in-from-bottom-2 fade-in duration-300 md:bottom-8 md:right-8">
      <div className={`overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm ${getStatusStyles(data.status)}`}>
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="shrink-0 pt-0.5">
              {getStatusIcon(data.status)}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {getStatusTitle(data.status)}
                </p>
                {data.status === 'RUNNING' && (
                  <span className="text-xs font-mono font-medium">
                    {data.progress}%
                  </span>
                )}
              </div>
              
              <p className="text-sm opacity-90">
                {getStatusMessage(data.status, data.estimatedTimeRemaining)}
              </p>

              {data.status === 'RUNNING' && (
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200/20">
                  <div 
                    className="h-full bg-current transition-all duration-500 ease-in-out"
                    style={{ width: `${Math.max(5, data.progress)}%` }}
                  />
                </div>
              )}

              {data.status === 'FAILED' && (
                <button
                  onClick={handleRetry}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-white/20 px-3 py-1.5 text-xs font-medium hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <RefreshCw className="h-3 w-3" />
                  Retry Synchronization
                </button>
              )}
            </div>

            <button
              onClick={() => {
                setIsVisible(false);
                setDismissed(true);
              }}
              className="shrink-0 rounded-md p-1 opacity-60 hover:bg-black/5 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current"
              aria-label="Dismiss"
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to determine styles based on status
function getStatusStyles(status: SyncState['status']): string {
  switch (status) {
    case 'RUNNING':
      return 'bg-blue-600/95 border-blue-700 text-white dark:bg-blue-900/95 dark:border-blue-800';
    case 'COMPLETED':
      return 'bg-green-600/95 border-green-700 text-white dark:bg-green-900/95 dark:border-green-800';
    case 'FAILED':
      return 'bg-red-600/95 border-red-700 text-white dark:bg-red-900/95 dark:border-red-800';
    default:
      return 'bg-gray-800 border-gray-700 text-white';
  }
}

// Helper to get icon
function getStatusIcon(status: SyncState['status']) {
  switch (status) {
    case 'RUNNING':
      return <Loader2 className="h-5 w-5 animate-spin" />;
    case 'COMPLETED':
      return <CheckCircle2 className="h-5 w-5" />;
    case 'FAILED':
      return <AlertCircle className="h-5 w-5" />;
    default:
      return <Loader2 className="h-5 w-5" />;
  }
}

// Helper for title text
function getStatusTitle(status: SyncState['status']): string {
  switch (status) {
    case 'RUNNING': return 'Syncing Data';
    case 'COMPLETED': return 'Sync Complete';
    case 'FAILED': return 'Sync Failed';
    default: return 'Pending';
  }
}

// Helper for detailed message
function getStatusMessage(status: SyncState['status'], eta?: number): string {
  switch (status) {
    case 'RUNNING':
      return eta 
        ? `Estimated time remaining: ${Math.ceil(eta / 60)} mins`
        : 'Importing historical data...';
    case 'COMPLETED':
      return 'Your data has been successfully synchronized.';
    case 'FAILED':
      return 'We encountered an issue while syncing your data.';
    default:
      return 'Waiting to start...';
  }
}

export default GlobalSyncStatus;