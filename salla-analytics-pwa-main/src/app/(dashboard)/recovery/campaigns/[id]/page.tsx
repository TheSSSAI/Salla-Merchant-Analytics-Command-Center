import React from 'react';
import { notFound } from 'next/navigation';

// Mock Types
interface CampaignDetail {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  steps: {
    id: string;
    delay: number;
    delayUnit: 'hours' | 'days';
    templateName: string;
    stats: { sent: number; opened: number; clicked: number };
  }[];
  createdAt: string;
}

// Mock Service
const getCampaignById = async (id: string): Promise<CampaignDetail | null> => {
  if (id === 'missing') return null;
  return {
    id,
    name: 'Standard Abandonment Flow',
    status: 'active',
    createdAt: new Date().toISOString(),
    steps: [
      { 
        id: 'step_1', 
        delay: 1, 
        delayUnit: 'hours', 
        templateName: 'Quick Reminder', 
        stats: { sent: 500, opened: 250, clicked: 50 } 
      },
      { 
        id: 'step_2', 
        delay: 24, 
        delayUnit: 'hours', 
        templateName: 'Discount Offer', 
        stats: { sent: 200, opened: 150, clicked: 80 } 
      }
    ]
  };
};

interface PageProps {
  params: { id: string };
}

export default async function CampaignDetailPage({ params }: PageProps) {
  const campaign = await getCampaignById(params.id);

  if (!campaign) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{campaign.name}</h1>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize
              ${campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {campaign.status}
            </span>
            <span className="text-sm text-muted-foreground">Created on {new Date(campaign.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-muted">Edit Sequence</button>
          {campaign.status === 'active' ? (
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-600">Pause</button>
          ) : (
            <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">Activate</button>
          )}
        </div>
      </div>

      {/* Sequence Visualizer */}
      <div className="border rounded-lg bg-card overflow-hidden">
        <div className="px-6 py-4 border-b bg-muted/30">
          <h3 className="font-semibold">Campaign Sequence</h3>
        </div>
        <div className="p-6 space-y-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-10 top-6 bottom-6 w-0.5 bg-gray-200" aria-hidden="true" />

          {campaign.steps.map((step, index) => (
            <div key={step.id} className="relative flex items-start space-x-4">
              {/* Step Number Bubble */}
              <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                {index + 1}
              </div>
              
              {/* Step Card */}
              <div className="flex-1 bg-white border rounded shadow-sm p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-sm">Wait {step.delay} {step.delayUnit}</h4>
                    <p className="text-sm text-muted-foreground">Send template: <span className="font-semibold text-foreground">{step.templateName}</span></p>
                  </div>
                  <button className="text-xs text-blue-600 hover:underline">Edit Step</button>
                </div>
                
                {/* Mini Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t text-center">
                  <div>
                    <div className="text-xs text-muted-foreground">Sent</div>
                    <div className="font-semibold text-sm">{step.stats.sent}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Opened</div>
                    <div className="font-semibold text-sm">{step.stats.opened}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Clicked</div>
                    <div className="font-semibold text-sm">{step.stats.clicked}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}