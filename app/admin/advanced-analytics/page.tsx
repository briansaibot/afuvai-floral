'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdvancedAnalytics() {
  const [activeTab, setActiveTab] = useState<'profitability' | 'voice-of-customer' | 'competitor' | 'inventory' | 'seasonal'>('profitability');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
            <p className="text-gray-600">Profitability, customer voice, competitors, inventory forecasting</p>
          </div>
          <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Dashboard
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {['profitability', 'voice-of-customer', 'competitor', 'inventory', 'seasonal'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 font-medium transition border-b-2 ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              {tab === 'profitability' ? '💵 Profitability' :
               tab === 'voice-of-customer' ? '💬 Voice of Customer' :
               tab === 'competitor' ? '👀 Competitors' :
               tab === 'inventory' ? '📦 Inventory' : '🌍 Seasonal'}
            </button>
          ))}
        </div>

        {/* Profitability */}
        {activeTab === 'profitability' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profit by Product</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Afuvai Purse', revenue: 18900, cost: 8505, profit: 10395 },
                  { name: 'Ivory Reverie', revenue: 15200, cost: 7296, profit: 7904 },
                  { name: 'Lavender Dreams', revenue: 12850, cost: 6682, profit: 6168 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#B8995A" />
                  <Bar dataKey="cost" fill="#888" />
                  <Bar dataKey="profit" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profitability Summary</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue (YTD)</p>
                  <p className="text-2xl font-bold text-gray-900">$287,450</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total COGS</p>
                  <p className="text-2xl font-bold text-orange-600">$129,350</p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">Gross Profit</p>
                  <p className="text-2xl font-bold text-green-600">$158,100</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Margin</p>
                  <p className="text-lg font-bold text-green-600">55%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Voice of Customer */}
        {activeTab === 'voice-of-customer' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Overall Sentiment</p>
                <p className="text-3xl font-bold text-green-600">4.8★</p>
                <p className="text-xs text-gray-600">(89 reviews)</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Top Praise</p>
                <p className="font-semibold text-gray-900">Quality & Freshness</p>
                <p className="text-xs text-gray-600">48% of reviews</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Top Complaint</p>
                <p className="font-semibold text-gray-900">Delivery Delays</p>
                <p className="text-xs text-gray-600">12% of reviews</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Feedback</h3>
              <div className="space-y-3">
                {[
                  { text: '🌟🌟🌟🌟🌟 Absolutely beautiful! Best flowers I\'ve ever received.', type: 'positive' },
                  { text: '🌟🌟🌟🌟 Great quality. Wish delivery had more time slots.', type: 'mixed' },
                  { text: '🌟🌟🌟🌟🌟 Delivered exactly on time. Impressive service!', type: 'positive' },
                ].map((review, i) => (
                  <p key={i} className="text-sm text-gray-600">{review.text}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Competitor Tracking */}
        {activeTab === 'competitor' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Price Monitoring</h2>
            <div className="space-y-3">
              {[
                { competitor: '1-800-Flowers', product: 'Premium Rose Bouquet', theirPrice: 89.99, ourPrice: 85, status: 'Competitive' },
                { competitor: 'FTD', product: 'Luxury Arrangement', theirPrice: 125, ourPrice: 128, status: 'Premium' },
                { competitor: 'Local Vegas Florist', product: 'Same Day Delivery Bouquet', theirPrice: 95, ourPrice: 85, status: 'Undercut' },
              ].map((comp, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{comp.competitor}</p>
                    <p className="text-xs text-gray-600">{comp.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Them: <span className="font-bold">${comp.theirPrice}</span></p>
                    <p className="text-sm">You: <span className="font-bold text-blue-600">${comp.ourPrice}</span></p>
                    <span className={`text-xs font-semibold mt-1 inline-block px-2 py-1 rounded ${
                      comp.status === 'Undercut' ? 'bg-green-100 text-green-700' :
                      comp.status === 'Competitive' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {comp.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inventory */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { product: 'Roses', stock: 45, reorderAt: 20, status: 'healthy' },
                { product: 'Peonies', stock: 8, reorderAt: 15, status: 'low' },
                { product: 'Orchids', stock: 32, reorderAt: 10, status: 'healthy' },
              ].map((item, i) => (
                <div key={i} className={`rounded-lg border-2 p-4 ${
                  item.status === 'low' ? 'bg-red-50 border-red-300' : 'bg-white border-gray-200'
                }`}>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.product}</h3>
                  <p className={`text-2xl font-bold ${item.status === 'low' ? 'text-red-600' : 'text-green-600'}`}>
                    {item.stock} units
                  </p>
                  <p className="text-xs text-gray-600">Reorder at: {item.reorderAt}</p>
                  {item.status === 'low' && (
                    <button className="mt-2 w-full px-2 py-1 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700">
                      Reorder Now
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Automation Rules</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked className="w-4 h-4" />
                  <span className="text-gray-600">Auto-reorder when stock hits threshold</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked className="w-4 h-4" />
                  <span className="text-gray-600">Notify admin when inventory low</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={false} className="w-4 h-4" />
                  <span className="text-gray-600">Block orders when stock depleted</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Seasonal */}
        {activeTab === 'seasonal' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🌍 Seasonal Campaign Calendar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { date: 'Feb 14', event: 'Valentine\'s Day', status: 'Active', roi: '+285%' },
                { date: 'May 11', event: 'Mother\'s Day', status: 'Planned', roi: 'TBD' },
                { date: 'May-Jun', event: 'Wedding Season', status: 'Planned', roi: 'TBD' },
                { date: 'Dec 25', event: 'Christmas', status: 'Planning', roi: 'TBD' },
              ].map((season, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{season.event}</p>
                      <p className="text-xs text-gray-600">{season.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      season.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {season.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-blue-600">ROI: {season.roi}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
