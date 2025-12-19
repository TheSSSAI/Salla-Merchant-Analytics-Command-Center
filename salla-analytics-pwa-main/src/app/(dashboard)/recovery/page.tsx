import React from 'react';
import { z } from 'zod';
import Link from 'next/link';

// Mock Data Types (Level 1 typically)
interface AbandonedCart {
  id: string;
  customerName: string;
  customerEmail: string;
  totalValue: number;
  itemsCount: number;
  abandonedAt: string; // ISO Date
  status: 'active' | 'recovered' | 'lost';
}

// Mock Service Fetch
const getAbandonedCarts = async (page: number, filters: any): Promise<{ data: AbandonedCart[], total: number }> => {
  // Simulate DB fetch
  return {
    data: [
      { id: 'cart_1', customerName: 'John Doe', customerEmail: 'john@example.com', totalValue: 150.00, itemsCount: 2, abandonedAt: new Date().toISOString(), status: 'active' },
      { id: 'cart_2', customerName: 'Anonymous', customerEmail: 'guest@example.com', totalValue: 45.50, itemsCount: 1, abandonedAt: new Date(Date.now() - 86400000).toISOString(), status: 'active' },
    ],
    total: 2
  };
};

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CartRecoveryPage({ searchParams }: PageProps) {
  // 1. Parse Search Params
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const dateFrom = typeof searchParams.from === 'string' ? searchParams.from : undefined;
  const dateTo = typeof searchParams.to === 'string' ? searchParams.to : undefined;

  // 2. Fetch Data
  const { data: carts, total } = await getAbandonedCarts(page, { dateFrom, dateTo });

  // 3. Render
  return (
    <div className="space-y-6">
      {/* Actions and Filters Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Placeholder for DateRangeFilter Client Component */}
          <div className="border px-3 py-2 rounded text-sm text-muted-foreground bg-white">
            Date Range: {dateFrom ? `${dateFrom} - ${dateTo}` : 'Last 30 Days'}
          </div>
        </div>
        <div className="flex items-center space-x-2">
           <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded text-sm font-medium">
             Export CSV
           </button>
        </div>
      </div>

      {/* Carts Table */}
      <div className="border rounded-lg shadow-sm bg-card">
        {carts.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <p>No abandoned carts found for the selected period.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Value</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Abandoned At</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {carts.map((cart) => (
                <tr key={cart.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium">{cart.customerName}</div>
                    <div className="text-xs text-muted-foreground">{cart.customerEmail || 'No email provided'}</div>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'SAR' }).format(cart.totalValue)}
                  </td>
                  <td className="px-4 py-3">{cart.itemsCount} items</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(cart.abandonedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {cart.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/recovery/details/${cart.id}`} className="text-blue-600 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>Showing {carts.length} of {total} results</div>
        <div className="flex space-x-2">
          <button disabled={page <= 1} className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>
          <button disabled={carts.length < 20} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}