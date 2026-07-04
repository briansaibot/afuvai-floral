'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { customerProfiles } from '@/lib/customerProfiles';

export default function Customer360Page() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'preferences' | 'actions'>('overview');
  
  // Use Wendy (first customer) as demo
  const customer = customerProfiles[0];
  
  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <Link href="/admin/customers" className="text-sm font-medium text-blue-600 hover:text-blue-700 mb-2">
              ← Back to Customers
            </Link>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{customer.name}</h1>
                <p className="text-lg text-gray-600">Whale Tier • LTV: ${customer.lifetimeValue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              Send Email
            </button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
              Send SMS
            </button>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">
              Custom Action
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-600 font-semibold mb-1">TIER</p>
            <p className="text-2xl font-bold text-purple-600">🐋 Whale</p>
            <p className="text-xs text-gray-600 mt-1">Top 1% of customers</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-600 font-semibold mb-1">LIFETIME VALUE</p>
            <p className="text-2xl font-bold text-green-600">${customer.lifetimeValue.toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-1">Total spent ever</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-600 font-semibold mb-1">CHURN RISK</p>
            <p className="text-2xl font-bold text-green-600">{customer.churnRisk}%</p>
            <p className="text-xs text-gray-600 mt-1">Very Low (Loyal)</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-600 font-semibold mb-1">REPEAT RATE</p>
            <p className="text-2xl font-bold text-blue-600">{customer.repeatRate}%</p>
            <p className="text-xs text-gray-600 mt-1">Comes back often</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-600 font-semibold mb-1">LAST PURCHASE</p>
            <p className="text-2xl font-bold text-orange-600">3d ago</p>
            <p className="text-xs text-gray-600 mt-1">$385.50</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {['overview', 'history', 'preferences', 'actions'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 font-medium transition border-b-2 ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              {tab === 'overview' && '📊 Overview'}
              {tab === 'history' && '📜 Purchase History'}
              {tab === 'preferences' && '❤️ Preferences'}
              {tab === 'actions' && '⚡ Smart Actions'}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Purchase Activity</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-900">{customer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average Order Value</p>
                    <p className="text-2xl font-bold text-blue-600">${(customer.lifetimeValue / customer.totalOrders).toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-green-600">${customer.totalSpent.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Email Open Rate</p>
                    <p className="text-2xl font-bold text-purple-600">68%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Click Rate</p>
                    <p className="text-2xl font-bold text-purple-600">34%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Engagement Score</p>
                    <p className="text-2xl font-bold text-purple-600">{customer.engagementScore}/100</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Referral Impact</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Referrals Made</p>
                    <p className="text-3xl font-bold text-pink-600">{customer.referrals}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Referral Revenue</p>
                    <p className="text-2xl font-bold text-pink-600">${customer.referralValue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 font-semibold">Email</p>
                  <p className="text-gray-900">{customer.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">Phone</p>
                  <p className="text-gray-900">{customer.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">Customer Since</p>
                  <p className="text-gray-900">{customer.createdAt}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold">Last Purchase</p>
                  <p className="text-gray-900">{customer.lastPurchase}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Complete Purchase Timeline</h3>
            <div className="space-y-3">
              {[
                { date: 'Jun 28, 2024', event: '🛍️ Order #1247', detail: 'Afuvai Purse ($225) + delivery', status: 'Delivered' },
                { date: 'Jun 21, 2024', event: '📧 Email opened', detail: 'VIP Summer Sale campaign', status: 'Opened' },
                { date: 'Jun 15, 2024', event: '🛍️ Order #1218', detail: 'Ivory Reverie ($185) + 2 add-ons', status: 'Delivered' },
                { date: 'Jun 8, 2024', event: '💬 SMS sent', detail: 'Referral bonus reminder', status: 'Delivered' },
                { date: 'May 30, 2024', event: '🛍️ Order #1189', detail: 'Lavender Dreams ($215)', status: 'Delivered' },
              ].map((item, i) => (
                <div key={i} className="border-l-4 border-blue-600 pl-4 py-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{item.event}</p>
                      <p className="text-sm text-gray-600">{item.detail}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-700">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREFERENCES TAB */}
        {activeTab === 'preferences' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">🌸 Favorite Flowers</h3>
              <div className="space-y-2">
                {customer.favoriteFlowers.map(flower => (
                  <div key={flower} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-900">{flower}</span>
                    <span className="text-sm text-gray-600">⭐⭐⭐⭐⭐</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">📅 Favorite Occasions</h3>
              <div className="space-y-2">
                {customer.preferredOccasions.map(occ => (
                  <div key={occ} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-900">{occ}</span>
                    <span className="text-sm text-gray-600">🎯 Frequent</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ACTIONS TAB */}
        {activeTab === 'actions' && (
          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">✅ Smart Recommendations</h3>
              <div className="space-y-2 text-sm text-green-800">
                <p>• Next order predicted: July 19 (+/- 3 days)</p>
                <p>• Recommend: Orchids (never ordered, high match)</p>
                <p>• Bundle: Afuvai Purse + add-ons (highest AOV)</p>
                <p>• Upsell: Premium subscription ($89/mo)</p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">⚡ Available Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-white border border-blue-200 rounded hover:bg-blue-50 transition">
                  📧 Send Personalized Email
                </button>
                <button className="w-full text-left px-4 py-3 bg-white border border-blue-200 rounded hover:bg-blue-50 transition">
                  💬 Send SMS
                </button>
                <button className="w-full text-left px-4 py-3 bg-white border border-blue-200 rounded hover:bg-blue-50 transition">
                  🎁 Apply Referral Credit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
