'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AIPersonalizationPage() {
  const [activeTab, setActiveTab] = useState<'predictive' | 'recommendations' | 'pricing' | 'churn' | 'segmentation'>('predictive');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🤖 AI & Personalization Engine</h1>
            <p className="text-gray-600">Predictive analytics, recommendations, dynamic pricing, churn prevention, smart segmentation</p>
          </div>
          <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Dashboard
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
          {[
            { key: 'predictive', label: '🔮 Predictive' },
            { key: 'recommendations', label: '💡 Recommendations' },
            { key: 'pricing', label: '💰 Dynamic Pricing' },
            { key: 'churn', label: '🚨 Churn Prevention' },
            { key: 'segmentation', label: '🎯 Smart Segments' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-3 font-medium transition border-b-2 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* PREDICTIVE TAB */}
        {activeTab === 'predictive' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Next Purchase Predictions</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { customer: 'Wendy N.', daysUntilPurchase: 19, confidence: 94 },
                  { customer: 'Michele A.', daysUntilPurchase: 34, confidence: 87 },
                  { customer: 'Myke N.', daysUntilPurchase: 28, confidence: 82 },
                  { customer: 'Jordan T.', daysUntilPurchase: 41, confidence: 65 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="customer" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="daysUntilPurchase" stroke="#3b82f6" name="Days Until Purchase" />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-3">
                {[
                  { customer: 'Wendy N.', predicted: 'July 19', confidence: '94%', action: 'Email 3 days before' },
                  { customer: 'Michele A.', predicted: 'July 28', confidence: '87%', action: 'SMS 5 days before' },
                  { customer: 'Myke N.', predicted: 'July 22', confidence: '82%', action: 'Push notification' },
                  { customer: 'Jordan T.', predicted: 'August 5', confidence: '65%', action: 'Winback campaign' },
                ].map((pred, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">{pred.customer}</p>
                      <p className="text-xs text-gray-600">Predicted: {pred.predicted}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-blue-600">{pred.confidence}</p>
                      <p className="text-xs text-gray-600">{pred.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RECOMMENDATIONS TAB */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">💡 AI Product Recommendations</h2>
              <p className="text-sm text-gray-600 mb-4">Based on: Purchase history + flower preferences + occasion patterns + price affinity</p>
              
              <div className="space-y-4">
                {[
                  { customer: 'Wendy N.', rec1: 'Orchids ($245)', rec2: 'Premium Bundle ($385)', rec3: 'Spring Collection' },
                  { customer: 'Michele A.', rec1: 'Peonies ($220)', rec2: 'Seasonal Gift Set', rec3: 'Luxury Upgrade' },
                  { customer: 'Myke N.', rec1: 'Garden Bliss ($128)', rec2: 'Mid-Range Bundle', rec3: 'Frequent Buyer Set' },
                  { customer: 'Jordan T.', rec1: 'Budget Bouquet ($85)', rec2: 'Starter Bundle', rec3: 'Winback Offer' },
                ].map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{item.customer}</h4>
                    <div className="flex gap-2 flex-wrap">
                      {[item.rec1, item.rec2, item.rec3].map((rec, j) => (
                        <span key={j} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          {rec}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DYNAMIC PRICING TAB */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { product: 'Afuvai Purse', current: '$225', recommended: '$235', reason: 'High demand + low inventory', impact: '+$3.2k/mo' },
                { product: 'Ivory Reverie', current: '$185', recommended: '$175', reason: 'Competitor undercut by $15', impact: '+$1.8k/mo volume' },
                { product: 'Lavender Dreams', current: '$215', recommended: '$215', reason: 'Optimal price point', impact: 'Hold' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">{item.product}</h3>
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-600">Current Price</p>
                      <p className="text-2xl font-bold text-gray-900">{item.current}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Recommended</p>
                      <p className="text-2xl font-bold text-blue-600">{item.recommended}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{item.reason}</p>
                  <p className="text-sm font-bold text-green-600">{item.impact}</p>
                  <button className="w-full mt-4 px-3 py-2 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition">
                    Apply Change
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHURN PREVENTION TAB */}
        {activeTab === 'churn' && (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-900 mb-3">🚨 High Churn Risk Customers (Score 70+)</h3>
              <div className="space-y-2">
                {[
                  { customer: 'Jordan T.', score: 72, inactive: '19 days', action: 'Send winback SMS + email today' },
                  { customer: 'Sarah M.', score: 68, inactive: '38 days', action: 'Offer 15% discount + loyalty bonus' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-white rounded border border-red-200">
                    <div>
                      <p className="font-medium text-gray-900">{item.customer}</p>
                      <p className="text-xs text-gray-600">Risk: {item.score}/100 • Inactive: {item.inactive}</p>
                    </div>
                    <button className="px-3 py-2 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700 transition">
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">📈 Churn Prevention Results</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { month: 'May', before: 8, after: 3, retained: 5 },
                  { month: 'June', before: 6, after: 2, retained: 4 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="before" fill="#ef4444" name="Would churn" />
                  <Bar dataKey="after" fill="#10b981" name="Recovered" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* SMART SEGMENTS TAB */}
        {activeTab === 'segmentation' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">🎯 Auto-Generated Customer Segments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'High-Value Loyal', count: 59, criteria: 'LTV >$5k + repeat rate >60%', action: 'VIP treats' },
                  { name: 'At-Risk Whales', count: 3, criteria: 'LTV >$8k + inactive >30d', action: 'Winback now' },
                  { name: 'New & Engaged', count: 23, criteria: 'Joined <3mo + high opens', action: 'Nurture' },
                  { name: 'Inactive (90+ days)', count: 45, criteria: 'No purchase in 90 days', action: 'Re-engagement' },
                  { name: 'One-Time Buyers', count: 87, criteria: 'Single order ever', action: 'Follow-up' },
                  { name: 'Referral Advocates', count: 18, criteria: 'Made >2 referrals', action: 'Recognition' },
                ].map((segment, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{segment.name}</h4>
                      <span className="text-lg font-bold text-blue-600">{segment.count}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{segment.criteria}</p>
                    <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition font-semibold">
                      Send: {segment.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
