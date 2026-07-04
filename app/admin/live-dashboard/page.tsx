'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LiveDashboard() {
  const [revenueHour, setRevenueHour] = useState(2840);
  const [ordersHour, setOrdersHour] = useState(12);
  const [conversionRate, setConversionRate] = useState(3.2);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRevenueHour(prev => prev + Math.random() * 200 - 50);
      setOrdersHour(prev => Math.max(prev + Math.random() * 3 - 1, 0));
      setConversionRate(prev => prev + (Math.random() * 0.2 - 0.1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Live Dashboard 🔴 LIVE</h1>
            <p className="text-gray-600">Real-time metrics updating every 3 seconds</p>
          </div>
          <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Dashboard
          </Link>
        </div>

        {/* Live Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border-2 border-blue-400 p-6 shadow-lg animate-pulse">
            <p className="text-sm text-gray-600 mb-2">💰 Revenue This Hour</p>
            <h3 className="text-4xl font-bold text-blue-600">${revenueHour.toFixed(0)}</h3>
            <p className="text-xs text-blue-500 mt-2">📈 Real-time</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-green-400 p-6 shadow-lg animate-pulse">
            <p className="text-sm text-gray-600 mb-2">📦 Orders This Hour</p>
            <h3 className="text-4xl font-bold text-green-600">{ordersHour.toFixed(0)}</h3>
            <p className="text-xs text-green-500 mt-2">📈 Real-time</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-purple-400 p-6 shadow-lg animate-pulse">
            <p className="text-sm text-gray-600 mb-2">🎯 Conversion Rate</p>
            <h3 className="text-4xl font-bold text-purple-600">{conversionRate.toFixed(1)}%</h3>
            <p className="text-xs text-purple-500 mt-2">📈 Real-time</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-orange-400 p-6 shadow-lg">
            <p className="text-sm text-gray-600 mb-2">👥 Active Visitors</p>
            <h3 className="text-4xl font-bold text-orange-600">24</h3>
            <p className="text-xs text-orange-500 mt-2">📊 Connected</p>
          </div>
        </div>

        {/* Live Events Feed */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🔔 Live Events Feed</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {[
              { time: '16:17:45', event: '🛍️ New order from Wendy N. - $395.50', color: 'bg-green-50' },
              { time: '16:17:30', event: '📧 Email opened: "VIP Exclusive" campaign', color: 'bg-blue-50' },
              { time: '16:17:12', event: '💬 SMS delivered: Winback offer to Jordan T.', color: 'bg-purple-50' },
              { time: '16:16:58', event: '⭐ 5-star review: "Best flowers ever!"', color: 'bg-yellow-50' },
              { time: '16:16:45', event: '🛍️ New order from Michele A. - $245.75', color: 'bg-green-50' },
              { time: '16:16:30', event: '🎯 Referral completed: Jordan T. referred a new customer', color: 'bg-pink-50' },
            ].map((item, i) => (
              <div key={i} className={`${item.color} border border-gray-200 rounded-lg p-3 text-sm`}>
                <span className="text-gray-600 text-xs">{item.time}</span> {item.event}
              </div>
            ))}
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
            <h3 className="font-semibold text-red-900 mb-3">🚨 Critical Alerts</h3>
            <div className="space-y-2 text-sm text-red-800">
              <p>• Peonies inventory LOW (8 units)</p>
              <p>• Delivery success rate: 94% (target: 95%+)</p>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-900 mb-3">⚠️ Warnings</h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <p>• Jordan T. at-risk (19 days inactive) - trigger winback</p>
              <p>• SMS credit running low (845 remaining)</p>
            </div>
          </div>
        </div>

        {/* Available Integrations Status */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Real-Time Data Sources (Ready to Connect)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-white border border-blue-200 rounded p-2">
              <p className="text-xs font-semibold text-blue-900">✓ Stripe</p>
              <p className="text-xs text-gray-600">Payment processing</p>
            </div>
            <div className="bg-white border border-yellow-200 rounded p-2">
              <p className="text-xs font-semibold text-yellow-900">⚠ Klaviyo</p>
              <p className="text-xs text-gray-600">Email opens/clicks</p>
            </div>
            <div className="bg-white border border-yellow-200 rounded p-2">
              <p className="text-xs font-semibold text-yellow-900">⚠ Twilio</p>
              <p className="text-xs text-gray-600">SMS delivery</p>
            </div>
            <div className="bg-white border border-blue-200 rounded p-2">
              <p className="text-xs font-semibold text-blue-900">✓ Supabase</p>
              <p className="text-xs text-gray-600">Order creation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
