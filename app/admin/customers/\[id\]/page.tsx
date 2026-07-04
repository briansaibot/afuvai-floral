'use client';

import Link from 'next/link';
import { customerProfiles } from '@/lib/customerProfiles';
import { useState } from 'react';

export default function Customer360Page({ params }: { params: { id: string } }) {
  const customer = customerProfiles.find(c => c.id === params.id) || customerProfiles[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'preferences' | 'actions'>('overview');

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'whale': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'vip': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk < 20) return 'text-green-600';
    if (risk < 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <Link href="/admin/customers" className="text-sm font-medium text-blue-600 hover:text-blue-700 mb-2">
              ← Back to Customers
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{customer.name}</h1>
            <p className="text-gray-600">{customer.email} • {customer.phone}</p>
          </div>
          <div className="space-y-2">
            <button className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full text-sm font-medium">
              📧 Send Email Campaign
            </button>
            <button className="block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full text-sm font-medium">
              💬 Send SMS/WhatsApp
            </button>
            <button className="block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition w-full text-sm font-medium">
              🎁 Trigger Winback Flow
            </button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Tier</p>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getTierColor(customer.tier)}`}>
              {customer.tier.toUpperCase()}
            </div>
            <p className="text-xs text-gray-600 mt-2">LTV: ${customer.lifetimeValue.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Churn Risk</p>
            <p className={`text-3xl font-bold ${getRiskColor(customer.churnRisk)}`}>{customer.churnRisk}/100</p>
            <p className="text-xs text-gray-600 mt-2">
              {customer.churnRisk < 30 ? '✓ Low risk' : customer.churnRisk < 60 ? '⚠ Medium risk' : '🚨 High risk'}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Days Inactive</p>
            <p className="text-3xl font-bold text-gray-900">{customer.daysInactive}</p>
            <p className="text-xs text-gray-600 mt-2">Last: {new Date(customer.lastPurchase).toLocaleDateString()}</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Repeat Rate</p>
            <p className="text-3xl font-bold text-green-600">{(customer.repeatRate * 100).toFixed(0)}%</p>
            <p className="text-xs text-gray-600 mt-2">{customer.totalOrders} total orders</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Engagement Score</p>
            <p className="text-3xl font-bold text-blue-600">{customer.engagementScore}</p>
            <p className="text-xs text-gray-600 mt-2">RFM: {customer.rfmRecency}{customer.rfmFrequency}{customer.rfmMonetary}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {(['overview', 'history', 'preferences', 'actions'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium transition border-b-2 ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'overview' ? '📊 Overview' : tab === 'history' ? '📜 History' : tab === 'preferences' ? '❤️ Preferences' : '⚡ Actions'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Purchase Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{customer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">${customer.totalSpent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer Since</p>
                    <p className="text-sm font-semibold text-gray-900">{new Date(customer.firstPurchase).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cohort</p>
                    <p className="text-sm font-semibold text-gray-900">{customer.cohort}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Referral Activity</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Successful Referrals</span>
                    <span className="font-bold text-gray-900">{customer.referrals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Referral Value</span>
                    <span className="font-bold text-green-600">${customer.referralValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {customer.winbackEligible && (
                <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6">
                  <h3 className="font-semibold text-orange-900 mb-2">🚨 Winback Eligible</h3>
                  <p className="text-sm text-orange-800 mb-3">
                    This customer is at risk and qualifies for winback campaign.
                    {customer.predictedChurnDate && ` Predicted churn date: ${new Date(customer.predictedChurnDate).toLocaleDateString()}`}
                  </p>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm font-medium">
                    Launch Winback Flow
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {customer.isAutoReorderActive && (
                <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-900 mb-2">✓ Auto-Reorder Active</p>
                  <p className="text-xs text-green-800">Recurring orders in place</p>
                </div>
              )}

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">Notes</p>
                <p className="text-sm text-gray-600">{customer.notes}</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">🎁 Suggested Actions</p>
                <ul className="space-y-2 text-xs text-gray-600">
                  {customer.upsellOpportunity && (
                    <li>• Upsell: {customer.upsellOpportunity}</li>
                  )}
                  {customer.churnRisk > 50 && (
                    <li>• Send engagement email + discount</li>
                  )}
                  {customer.tier === 'standard' && customer.repeatRate > 0.5 && (
                    <li>• Candidate for VIP tier upgrade</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Journey</h2>
            <div className="space-y-4">
              {customer.journeyLog.map((event, i) => (
                <div key={i} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex-shrink-0 text-2xl">
                    {event.type === 'purchase' ? '🛍️' :
                     event.type === 'delivery' ? '🚚' :
                     event.type === 'email_sent' ? '📧' :
                     event.type === 'email_opened' ? '👁️' :
                     event.type === 'feedback' ? '⭐' :
                     event.type === 'product_view' ? '👀' : '📝'}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{event.description}</p>
                    <p className="text-xs text-gray-600 mt-1">{new Date(event.timestamp).toLocaleString()}</p>
                  </div>
                  {event.value && <div className="flex-shrink-0 font-bold text-gray-900">${event.value.toFixed(2)}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🌹 Flower Preferences</h3>
              <p className="text-sm text-gray-600 mb-2">Favorite Flowers:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {customer.favoriteFlowers.map(f => (
                  <span key={f} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">
                    {f}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-2">Preferred Occasions:</p>
              <div className="flex flex-wrap gap-2">
                {customer.preferredOccasions.map(o => (
                  <span key={o} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {o}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💬 Communication Preferences</h3>
              <div className="space-y-2">
                {Object.entries(customer.communicationPreferences).map(([channel, enabled]) => (
                  <div key={channel} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{channel}</span>
                    <span className={enabled ? 'text-green-600 font-bold' : 'text-gray-400'}>
                      {enabled ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💳 Purchase Preferences</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Price Point:</span>
                  <p className="font-semibold text-gray-900 capitalize">{customer.pricePointPreference}</p>
                </div>
                <div>
                  <span className="text-gray-600">Delivery Method:</span>
                  <p className="font-semibold text-gray-900 capitalize">{customer.deliveryPreference}</p>
                </div>
              </div>
            </div>

            {customer.anniversaryDates.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🎂 Important Dates</h3>
                <div className="space-y-2">
                  {customer.anniversaryDates.map((date, i) => (
                    <p key={i} className="text-sm font-semibold text-gray-900">
                      {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions Tab */}
        {activeTab === 'actions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📧 Email Campaigns</h3>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium mb-3">
                Send Email Campaign
              </button>
              <p className="text-xs text-gray-600">Recent: VIP Exclusive (opened), Summer Flowers (clicked)</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💬 SMS/WhatsApp</h3>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium mb-3">
                Send SMS/WhatsApp
              </button>
              <p className="text-xs text-gray-600">Opt-in: {Object.entries(customer.communicationPreferences).filter(([k, v]) => (k === 'sms' || k === 'whatsapp') && v).length > 0 ? '✓ Yes' : '✗ No'}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🎁 Discounts & Offers</h3>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium mb-3">
                Create Custom Discount
              </button>
              <p className="text-xs text-gray-600">Last offer: 20% off (Winback, 3mo ago)</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Automation Flows</h3>
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium mb-3">
                Trigger Winback Flow
              </button>
              <p className="text-xs text-gray-600">Ready: Email + SMS sequence</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
