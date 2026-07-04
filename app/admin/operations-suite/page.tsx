'use client';

import Link from 'next/link';
import { useState } from 'react';
import { priceOptimizations, emailCampaigns } from '@/lib/customerProfiles';

export default function OperationsSuite() {
  const [activeSection, setActiveSection] = useState<'free-delivery' | 'price-opt' | 'campaigns' | 'winback' | 'referral' | 'ab-test' | 'batch' | 'automation'>('free-delivery');

  const sections = {
    'free-delivery': { title: '🎁 Free Delivery Rules', icon: '🚚' },
    'price-opt': { title: '💰 Price Optimization', icon: '📊' },
    'campaigns': { title: '📧 Campaign Manager', icon: '📮' },
    'winback': { title: '🔄 Winback Flows', icon: '💌' },
    'referral': { title: '🎯 Referral Program', icon: '👥' },
    'ab-test': { title: '🧪 A/B Testing', icon: '⚗️' },
    'batch': { title: '⚡ Batch Operations', icon: '📦' },
    'automation': { title: '⚙️ Workflows', icon: '🔗' },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Operations Suite</h1>
            <p className="text-gray-600">Free delivery, pricing, campaigns, automation, testing</p>
          </div>
          <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Dashboard
          </Link>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {Object.entries(sections).map(([key, { title, icon }]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key as any)}
              className={`p-4 rounded-lg border-2 transition ${
                activeSection === key
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="text-2xl mb-1">{icon}</p>
              <p className="text-xs font-semibold text-gray-900 line-clamp-2">{title}</p>
            </button>
          ))}
        </div>

        {/* Free Delivery Rules */}
        {activeSection === 'free-delivery' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎁 Free Delivery Rules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">✓ Whale Tier</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Free delivery on all orders</p>
                  <p>• Signature delivery (white glove service)</p>
                  <p>• Priority: 9am slot reserved</p>
                  <button className="mt-3 px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold hover:bg-green-200">
                    Active
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">✓ VIP Tier</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Free delivery on orders >$150</p>
                  <p>• Auto-reorder orders (recurring)</p>
                  <p>• Seasonal promotions (Valentine's, Mother's Day)</p>
                  <button className="mt-3 px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold hover:bg-green-200">
                    Active
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">New Rule: Referral Bonus</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Free delivery when successful referral completes</p>
                  <p>• First-time buyers: $5 credit towards delivery</p>
                  <p>• Trigger: Create rule</p>
                  <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700">
                    Create Rule
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Price Optimization */}
        {activeSection === 'price-opt' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Price Optimization Engine</h2>
            <div className="space-y-4">
              {priceOptimizations.map((opt, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{opt.productName}</h3>
                    <span className={`text-sm font-bold ${opt.priceChange > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                      {opt.priceChange > 0 ? '+' : ''}{opt.priceChange}$ (${opt.currentPrice} → ${opt.recommendedPrice})
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{opt.reason}</p>
                  <p className="text-xs font-semibold text-blue-600 mb-3">Estimated Impact: {opt.estimatedImpact}</p>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700">
                    Apply Change
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Campaign Manager */}
        {activeSection === 'campaigns' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📧 Campaign Manager (Email + SMS)</h2>
            <div className="space-y-4">
              {emailCampaigns.map((camp, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{camp.name}</h3>
                      <p className="text-xs text-gray-600">Segment: {camp.segment}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      camp.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {camp.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 my-3 text-sm">
                    <div><span className="text-gray-600">Sent:</span> <p className="font-bold">{camp.sent}</p></div>
                    <div><span className="text-gray-600">Opened:</span> <p className="font-bold">{((camp.opened/camp.sent)*100).toFixed(0)}%</p></div>
                    <div><span className="text-gray-600">Clicked:</span> <p className="font-bold">{((camp.clicked/camp.sent)*100).toFixed(0)}%</p></div>
                    <div><span className="text-gray-600">Converted:</span> <p className="font-bold">{((camp.converted/camp.sent)*100).toFixed(0)}%</p></div>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700">
                    View Details
                  </button>
                </div>
              ))}
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                + Create New Campaign
              </button>
            </div>
          </div>
        )}

        {/* Winback Flows */}
        {activeSection === 'winback' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🔄 Winback Automation Flows</h2>
            <div className="space-y-4">
              {[
                { name: 'At-Risk (30 days): Email + SMS', active: true, triggered: 8 },
                { name: 'High-Value Inactive (60 days): Phone call + gift', active: true, triggered: 3 },
                { name: 'Birthday Reminder (auto-send day before)', active: true, triggered: 12 },
                { name: 'Seasonal Re-engagement (Valentine\'s Day)', active: false, triggered: 0 },
              ].map((flow, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">{flow.name}</h3>
                    <p className="text-xs text-gray-600">Triggered {flow.triggered} times this month</p>
                  </div>
                  <div className="space-x-2">
                    <button className={`px-3 py-1 rounded text-xs font-semibold ${
                      flow.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {flow.active ? 'Active' : 'Inactive'}
                    </button>
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Referral Program */}
        {activeSection === 'referral' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Referral Program</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-semibold">Total Referrals</p>
                <p className="text-3xl font-bold text-blue-600">47</p>
                <p className="text-xs text-blue-800 mt-1">New customers via word-of-mouth</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-900 font-semibold">Referral Revenue</p>
                <p className="text-3xl font-bold text-green-600">$12,450</p>
                <p className="text-xs text-green-800 mt-1">LTV from referred customers</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-900 font-semibold">Active Referrers</p>
                <p className="text-3xl font-bold text-purple-600">18</p>
                <p className="text-xs text-purple-800 mt-1">Customers who referred</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Current Offer: $25 credit per successful referral</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ Referrer gets $25 store credit</p>
                <p>✓ Referred friend gets $25 discount on first order</p>
                <p>✓ No limit on referrals (unlimited earning potential)</p>
              </div>
            </div>
          </div>
        )}

        {/* A/B Testing */}
        {activeSection === 'ab-test' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🧪 A/B Testing Framework</h2>
            <div className="space-y-4">
              {[
                { test: 'Email Subject Line: "Sale 20%" vs "Last chance!"', status: 'Running', winner: null, pValue: 0.34 },
                { test: 'Delivery Price: $5 vs Free for VIP', status: 'Complete', winner: 'Free delivery +18% conversions', pValue: 0.02 },
                { test: 'Product Price: $225 vs $235 (Afuvai Purse)', status: 'Queued', winner: null, pValue: null },
              ].map((test, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{test.test}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      test.status === 'Running' ? 'bg-blue-100 text-blue-700' :
                      test.status === 'Complete' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {test.status}
                    </span>
                  </div>
                  {test.winner && <p className="text-sm font-semibold text-green-600 mb-2">✓ {test.winner}</p>}
                  {test.pValue && <p className="text-xs text-gray-600">P-value: {test.pValue} (statistically significant)</p>}
                </div>
              ))}
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                + Create New Test
              </button>
            </div>
          </div>
        )}

        {/* Batch Operations */}
        {activeSection === 'batch' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ Batch Operations</h2>
            <div className="space-y-4">
              {[
                { op: 'Bulk Email Export', count: 287, status: 'Ready to send' },
                { op: 'SMS to At-Risk (30+ days inactive)', count: 34, status: 'Review before sending' },
                { op: 'Apply $25 referral credit to 18 customers', count: 18, status: 'Scheduled' },
                { op: 'Generate PDF invoices (50 orders)', count: 50, status: 'Complete' },
              ].map((op, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">{op.op}</h3>
                    <p className="text-sm text-gray-600">{op.count} records</p>
                  </div>
                  <div className="space-x-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{op.status}</span>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700">
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Automation / Workflows */}
        {activeSection === 'automation' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">⚙️ Workflow Automation (n8n + Zapier)</h2>
            <div className="space-y-4">
              {[
                { flow: 'Stripe Payment → Create Supabase Order → Send confirmation email', status: 'Active' },
                { flow: 'Customer reaches $5k LTV → Upgrade to VIP tier → Send welcome email', status: 'Active' },
                { flow: 'No purchase for 60 days → Send winback SMS + 15% discount', status: 'Active' },
                { flow: 'Referral successful → Add $25 credit to referrer + referred friend', status: 'Active' },
                { flow: 'New Whale customer → Assign to concierge → Schedule white-glove delivery', status: 'Setup required' },
              ].map((wf, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 text-sm">{wf.flow}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      wf.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {wf.status}
                    </span>
                  </div>
                </div>
              ))}
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                + Create New Workflow
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
