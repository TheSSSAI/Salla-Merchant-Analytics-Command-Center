import React from 'react';

// Mock Types
interface RecoveryKPIs {
  emailsSent: number;
  openRate: number;
  clickThroughRate: number;
  cartsRecovered: number;
  revenueRecovered: number;
}

// Mock Service
const getRecoveryAnalytics = async (period: string): Promise<RecoveryKPIs> => {
  return {
    emailsSent: 1250,
    openRate: 45.2,
    clickThroughRate: 12.8,
    cartsRecovered: 85,
    revenueRecovered: 24500.00
  };
};

// Component for a Single KPI Card
const KpiCard = ({ title, value, subtext }: { title: string, value: string, subtext?: string }) => (
  <div className="p-6 bg-card border rounded-lg shadow-sm">
    <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
    <div className="mt-2 text-2xl font-bold">{value}</div>
    {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
  </div>
);

export default async function RecoveryAnalyticsPage() {
  // In real implementation, extract date range from searchParams
  const analytics = await getRecoveryAnalytics('last_30_days');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium tracking-tight">Performance Overview</h2>
        <p className="text-sm text-muted-foreground">Key metrics for your cart recovery campaigns.</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
          title="Revenue Recovered" 
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'SAR' }).format(analytics.revenueRecovered)}
          subtext="+12% from last period"
        />
        <KpiCard 
          title="Carts Recovered" 
          value={analytics.cartsRecovered.toString()}
          subtext={`${analytics.cartsRecovered} orders completed`}
        />
        <KpiCard 
          title="Emails Sent" 
          value={analytics.emailsSent.toLocaleString()} 
        />
        <KpiCard 
          title="Open Rate" 
          value={`${analytics.openRate}%`}
          subtext={`CTR: ${analytics.clickThroughRate}%`} 
        />
      </div>

      {/* Chart Placeholder Area - Would integrate Recharts here */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-6 bg-card border rounded-lg h-[300px] flex items-center justify-center text-muted-foreground bg-slate-50">
          [Revenue Recovered Over Time Chart]
        </div>
        <div className="p-6 bg-card border rounded-lg h-[300px] flex items-center justify-center text-muted-foreground bg-slate-50">
          [Conversion Funnel Visualization]
        </div>
      </div>
    </div>
  );
}