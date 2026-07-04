'use client';

import Link from 'next/link';
import { integrationStatus } from '@/lib/customerProfiles';
import { useState } from 'react';

export default function IntegrationsPage() {
  const [connections, setConnections] = useState(integrationStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-700 border-green-300';
      case 'needs_setup': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'error': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return '✓';
      case 'needs_setup': return '⚠';
      case 'error': return '✕';
      default: return '○';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Integrations Hub</h1>
            <p className="text-gray-600">Connect external services for email, SMS, inventory, analytics, automation</p>
          </div>
          <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-green-50 border border-green-300 rounded-lg p-4">
            <p className="text-sm text-green-900 font-semibold mb-1">Connected</p>
            <p className="text-2xl font-bold text-green-600">{connections.filter(c => c.status === 'connected').length}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
            <p className="text-sm text-yellow-900 font-semibold mb-1">Need Setup</p>
            <p className="text-2xl font-bold text-yellow-600">{connections.filter(c => c.status === 'needs_setup').length}</p>
          </div>
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
            <p className="text-sm text-gray-900 font-semibold mb-1">Disconnected</p>
            <p className="text-2xl font-bold text-gray-600">{connections.filter(c => c.status === 'disconnected').length}</p>
          </div>
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
            <p className="text-sm text-blue-900 font-semibold mb-1">Setup Readiness</p>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round((connections.filter(c => c.status === 'connected').length / connections.length) * 100)}%
            </p>
          </div>
        </div>

        {/* Category Sections */}
        <div className="space-y-8">
          {/* Marketing & Email */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📧 Email & SMS Marketing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.filter(c => ['Klaviyo (Email Marketing)', 'Twilio (SMS/WhatsApp)'].includes(c.name)).map(conn => (
                <div key={conn.name} className={`p-4 border-2 rounded-lg ${getStatusColor(conn.status)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{conn.name}</h3>
                    <span className="text-lg">{getStatusIcon(conn.status)}</span>
                  </div>
                  <p className="text-xs mb-3 opacity-75">
                    {conn.status === 'connected' && `Last sync: ${new Date(conn.lastSync!).toLocaleString()}`}
                    {conn.status === 'needs_setup' && 'Not yet connected'}
                    {conn.status === 'disconnected' && 'Disconnected'}
                  </p>
                  <a
                    href={conn.setupUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-3 py-1 bg-current bg-opacity-20 rounded text-xs font-semibold hover:bg-opacity-30 transition"
                  >
                    {conn.status === 'connected' ? 'Manage' : 'Connect'}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Billing */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">💳 Payment & Billing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.filter(c => ['Stripe'].includes(c.name)).map(conn => (
                <div key={conn.name} className={`p-4 border-2 rounded-lg ${getStatusColor(conn.status)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{conn.name}</h3>
                    <span className="text-lg">{getStatusIcon(conn.status)}</span>
                  </div>
                  <p className="text-xs mb-3 opacity-75">Payments processed: 1,224 orders ($287k)</p>
                  <a href="#" className="inline-block px-3 py-1 bg-current bg-opacity-20 rounded text-xs font-semibold hover:bg-opacity-30 transition">
                    Manage
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Data & Analytics */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Data & Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.filter(c => ['Metabase (BI)', 'Segment (Analytics)'].includes(c.name)).map(conn => (
                <div key={conn.name} className={`p-4 border-2 rounded-lg ${getStatusColor(conn.status)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{conn.name}</h3>
                    <span className="text-lg">{getStatusIcon(conn.status)}</span>
                  </div>
                  <p className="text-xs mb-3 opacity-75">
                    {conn.status === 'needs_setup' ? 'Advanced analytics & dashboards' : 'Track all customer interactions'}
                  </p>
                  <a href={conn.setupUrl} target="_blank" rel="noreferrer" className="inline-block px-3 py-1 bg-current bg-opacity-20 rounded text-xs font-semibold hover:bg-opacity-30 transition">
                    {conn.status === 'connected' ? 'Manage' : 'Connect'}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Automation & Workflows */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">⚙️ Automation & Workflows</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.filter(c => ['Zapier (Automation)'].includes(c.name)).map(conn => (
                <div key={conn.name} className={`p-4 border-2 rounded-lg ${getStatusColor(conn.status)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{conn.name}</h3>
                    <span className="text-lg">{getStatusIcon(conn.status)}</span>
                  </div>
                  <p className="text-xs mb-3 opacity-75">Connect to 1000+ apps: accounting, CRM, invoicing</p>
                  <a href={conn.setupUrl} target="_blank" rel="noreferrer" className="inline-block px-3 py-1 bg-current bg-opacity-20 rounded text-xs font-semibold hover:bg-opacity-30 transition">
                    Setup Now
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Backend & Database */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🗄️ Backend & Database</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.filter(c => ['Supabase', 'Gmail/Google Workspace'].includes(c.name)).map(conn => (
                <div key={conn.name} className={`p-4 border-2 rounded-lg ${getStatusColor(conn.status)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{conn.name}</h3>
                    <span className="text-lg">{getStatusIcon(conn.status)}</span>
                  </div>
                  <p className="text-xs mb-3 opacity-75">
                    {conn.name === 'Supabase' ? 'PostgreSQL database + auth' : 'Email delivery + spam monitoring'}
                  </p>
                  <a href="#" className="inline-block px-3 py-1 bg-current bg-opacity-20 rounded text-xs font-semibold hover:bg-opacity-30 transition">
                    Manage
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory & Fulfillment */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📦 Inventory & Fulfillment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.filter(c => ['Shopify (Inventory)', 'HubSpot (CRM)'].includes(c.name)).map(conn => (
                <div key={conn.name} className={`p-4 border-2 rounded-lg ${getStatusColor(conn.status)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{conn.name}</h3>
                    <span className="text-lg">{getStatusIcon(conn.status)}</span>
                  </div>
                  <p className="text-xs mb-3 opacity-75">
                    {conn.name === 'Shopify (Inventory)' ? 'Real-time inventory sync' : 'Unified customer view'}
                  </p>
                  <a href={conn.setupUrl} target="_blank" rel="noreferrer" className="inline-block px-3 py-1 bg-current bg-opacity-20 rounded text-xs font-semibold hover:bg-opacity-30 transition">
                    Setup Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Setup Recommendation */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-blue-900 mb-3">🚀 Recommended Setup Priority</h3>
          <ol className="space-y-2 text-sm text-blue-800">
            <li><strong>1. Klaviyo</strong> (Email marketing) - Send campaigns to customer segments</li>
            <li><strong>2. Twilio</strong> (SMS/WhatsApp) - Direct messaging for winback, deliveries</li>
            <li><strong>3. Zapier</strong> (Automation) - Connect everything without code</li>
            <li><strong>4. Metabase</strong> (BI) - Self-hosted advanced analytics</li>
            <li><strong>5. Shopify or Cin7</strong> (Inventory) - Real-time stock sync</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
