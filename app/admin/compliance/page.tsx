'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState<'alerts' | 'loyalty' | 'gdpr' | 'security' | 'performance'>('alerts');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🔐 Compliance & Security</h1>
            <p className="text-gray-600">Alerts, loyalty programs, GDPR, performance monitoring, audit trails</p>
          </div>
          <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Dashboard
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
          {[
            { key: 'alerts', label: '🔔 Alert Rules' },
            { key: 'loyalty', label: '🏆 Loyalty & Rewards' },
            { key: 'gdpr', label: '📋 GDPR Compliance' },
            { key: 'security', label: '🔒 Security' },
            { key: 'performance', label: '⚡ Performance' },
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

        {/* ALERTS TAB */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Active Alerts</p>
                <p className="text-3xl font-bold text-blue-600">6</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Critical Triggered Today</p>
                <p className="text-3xl font-bold text-red-600">2</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Alert Methods</p>
                <p className="text-sm font-bold text-gray-900">Email, Slack, SMS</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Custom Alert Rules</h3>
              <div className="space-y-3">
                {[
                  { rule: 'Revenue drops >20% in one day', status: 'active', trigger: '0 times this month' },
                  { rule: 'Churn rate exceeds 5%', status: 'active', trigger: '0 times this month' },
                  { rule: 'Inventory low (>3 items)', status: 'active', trigger: '1 time (Peonies)' },
                  { rule: 'Failed payment >5 times', status: 'active', trigger: '0 times this month' },
                  { rule: 'API error rate >2%', status: 'active', trigger: '0 times this month' },
                  { rule: 'New high-value customer', status: 'active', trigger: '3 times this month' },
                ].map((alert, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">{alert.rule}</p>
                      <p className="text-xs text-gray-600">{alert.trigger}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">Active</span>
                      <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm font-medium">
                + Create New Alert
              </button>
            </div>
          </div>
        )}

        {/* LOYALTY TAB */}
        {activeTab === 'loyalty' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">💰 Points System</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Points per $1 spent</p>
                    <p className="text-2xl font-bold text-purple-600">5</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total points issued</p>
                    <p className="text-2xl font-bold text-purple-600">8,420</p>
                  </div>
                  <button className="w-full px-3 py-2 bg-purple-100 text-purple-700 rounded text-xs font-semibold hover:bg-purple-200 transition">
                    Manage Points
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">🎁 Tier Benefits</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-purple-50 rounded">
                    <p className="font-semibold text-gray-900">Whale Tier</p>
                    <p className="text-xs text-gray-600">Free delivery + early access</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <p className="font-semibold text-gray-900">VIP Tier</p>
                    <p className="text-xs text-gray-600">Free delivery &gt;$150 + discounts</p>
                  </div>
                  <button className="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200 transition mt-2">
                    Customize Tiers
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">📅 VIP Concierge</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Scheduled consults</p>
                    <p className="text-2xl font-bold text-pink-600">8</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. satisfaction</p>
                    <p className="text-2xl font-bold text-pink-600">4.9★</p>
                  </div>
                  <button className="w-full px-3 py-2 bg-pink-100 text-pink-700 rounded text-xs font-semibold hover:bg-pink-200 transition">
                    Book Consult
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GDPR TAB */}
        {activeTab === 'gdpr' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">✅ GDPR Compliance Status</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p>✓ Data processing agreements signed with all processors</p>
                <p>✓ Privacy policy published and up-to-date</p>
                <p>✓ Consent management system active</p>
                <p>✓ Data retention policies enforced (auto-delete after 7 years)</p>
                <p>✓ Right-to-be-forgotten requests processed within 30 days</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">📋 Data Export Requests</h3>
              <div className="space-y-3">
                {[
                  { customer: 'Wendy N.', requested: 'Jun 28', status: 'Ready for download', data: '12 MB (CSV)' },
                  { customer: 'Jordan T.', requested: 'Jun 25', status: 'Processing', data: '~2 MB' },
                ].map((req, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{req.customer}</h4>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        req.status.includes('Ready') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Requested: {req.requested}</p>
                    {req.status.includes('Ready') && (
                      <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition">
                        📥 Download {req.data}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm font-medium">
                + Create New Export Request
              </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">🗑 Right-to-be-Forgotten Requests</h3>
              <p className="text-sm text-gray-600 mb-4">All data for customer deleted after 30 days</p>
              <div className="space-y-2">
                {[
                  { customer: 'Old Customer #1234', requested: 'Jun 15', daysLeft: '9 days until deletion' },
                  { customer: 'Old Customer #5678', requested: 'Jun 18', daysLeft: '6 days until deletion' },
                ].map((req, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-red-50 rounded border border-red-200">
                    <div>
                      <p className="font-medium text-gray-900">{req.customer}</p>
                      <p className="text-xs text-gray-600">Requested: {req.requested}</p>
                    </div>
                    <p className="text-xs font-bold text-red-600">{req.daysLeft}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">🔒 Authentication</h3>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked className="w-4 h-4" />
                    <span className="text-gray-700">2-Factor Authentication (2FA)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked className="w-4 h-4" />
                    <span className="text-gray-700">API Key Management</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked className="w-4 h-4" />
                    <span className="text-gray-700">Session Timeout (12 hrs)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked className="w-4 h-4" />
                    <span className="text-gray-700">PIN-based admin login</span>
                  </label>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">🔐 Data Protection</h3>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked className="w-4 h-4" />
                    <span className="text-gray-700">Encryption at rest (AES-256)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked className="w-4 h-4" />
                    <span className="text-gray-700">Encryption in transit (TLS 1.3)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked className="w-4 h-4" />
                    <span className="text-gray-700">Audit logging (all changes tracked)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-gray-700">Backup encryption</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">📋 Audit Trail</h3>
              <p className="text-sm text-gray-600 mb-4">Complete history of all admin actions</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {[
                  { time: '2:45 PM', user: 'Brian', action: 'Updated product price (Afuvai Purse: $225 → $235)' },
                  { time: '2:32 PM', user: 'Ami', action: 'Created email campaign (VIP Summer Sale)' },
                  { time: '2:15 PM', user: 'Brian', action: 'Exported customer data (287 records)' },
                  { time: '2:00 PM', user: 'System', action: 'Auto-completed 12 orders' },
                  { time: '1:45 PM', user: 'Ami', action: 'Added new alert rule (Revenue >20% drop)' },
                ].map((log, i) => (
                  <div key={i} className="text-xs p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="text-gray-600 font-medium">{log.time} • {log.user}</p>
                    <p className="text-gray-700">{log.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PERFORMANCE TAB */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <p className="text-sm text-gray-600 mb-2">API Uptime</p>
                <p className="text-3xl font-bold text-green-600">99.98%</p>
                <p className="text-xs text-gray-600 mt-1">Last 30 days</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Avg Response Time</p>
                <p className="text-3xl font-bold text-blue-600">145ms</p>
                <p className="text-xs text-gray-600 mt-1">p95: 320ms</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <p className="text-sm text-gray-600 mb-2">Error Rate</p>
                <p className="text-3xl font-bold text-green-600">0.12%</p>
                <p className="text-xs text-gray-600 mt-1">Down from 0.45% (↓ 73%)</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">⚡ Performance Optimizations</h3>
              <div className="space-y-3">
                {[
                  { feature: 'Redis Caching Layer', status: 'Deployed', benefit: '-60% DB queries' },
                  { feature: 'Database Indexing', status: 'Active', benefit: '3x faster searches' },
                  { feature: 'CDN for Static Assets', status: 'Active', benefit: 'Worldwide fast loads' },
                  { feature: 'Load Testing Suite', status: 'Monthly', benefit: 'Catch issues early' },
                ].map((opt, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">{opt.feature}</p>
                      <p className="text-xs text-gray-600">{opt.benefit}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">{opt.status}</span>
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
