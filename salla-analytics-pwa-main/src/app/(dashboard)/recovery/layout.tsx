import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// Mock function to verify role access
const verifyAccess = (role: string) => {
  const allowedRoles = ['Owner', 'Admin', 'Marketer'];
  return allowedRoles.includes(role);
};

// Mock function to get session
const getSession = () => {
  // In reality: validate access token from cookies
  const token = cookies().get('access_token');
  if (!token) return null;
  return { user: { role: 'Owner', id: '1' } }; 
};

interface RecoveryLayoutProps {
  children: React.ReactNode;
}

export default function RecoveryLayout({ children }: RecoveryLayoutProps) {
  const session = getSession();

  // 1. Authentication Check
  if (!session) {
    redirect('/login');
  }

  // 2. Role-Based Access Control (RBAC)
  // Cart Recovery is restricted to Owner, Admin, Marketer
  if (!verifyAccess(session.user.role)) {
    // Redirect to a safe default or 403 page
    redirect('/dashboard?error=access_denied');
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Module Header / Sub-navigation */}
      <header className="border-b bg-background px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Cart Recovery</h1>
          <p className="text-sm text-muted-foreground">
            Manage abandoned carts and automate recovery campaigns.
          </p>
        </div>
        <nav className="flex space-x-4">
          <a href="/recovery" className="text-sm font-medium hover:text-primary transition-colors">Overview</a>
          <a href="/recovery/analytics" className="text-sm font-medium hover:text-primary transition-colors">Analytics</a>
          <a href="/recovery/campaigns" className="text-sm font-medium hover:text-primary transition-colors">Campaigns</a>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-6 pb-6">
        {children}
      </main>
    </div>
  );
}