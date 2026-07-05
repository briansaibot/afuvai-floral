'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MessagingPage() {
  const [activeTab, setActiveTab] = useState<'channels' | 'campaigns' | 'templates' | 'schedule'>('channels');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📧 Multi-Channel Messaging Hub</h1>
            <p className="text-gray-600">Email, SMS, WhatsApp, Push notifications + scheduled campaigns</p>
          </div>
          <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Dashboard
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {[
            { key: 'channels', label: '💬 Channels', icon: '💬' },
            { key: 'campaigns', label: '📧 Active Campaigns', icon: '📧' },
            { key: 'templates', label: '📝 Templates', icon: '📝' },
            { key: 'schedule', label: '⏰ Scheduled', icon: '⏰' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-3 font-medium transition border-b-2 ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* CHANNELS TAB */}
        {activeTab === 'channels' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Email (Klaviyo)', status: 'connected', delivery: '94%', openRate: '42%' },
              { name: 'SMS (Twilio)', status: 'connected', delivery: '98%', openRate: '28%' },
              { name: 'WhatsApp (Twilio)', status: 'connected', delivery: '99%', openRate: '35%' },
              { name: 'Push Notifications', status: 'setup-required', delivery: '0%', openRate: '0%' },
            ].map((channel, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    channel.status === 'connected' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {channel.status === 'connected' ? '✓ Connected' : '⚠ Setup Required'}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Delivery Rate</p>
                    <p className="text-lg font-bold text-green-600">{channel.delivery}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Engagement Rate</p>
                    <p className="text-lg font-bold text-blue-600">{channel.openRate}</p>
                  </div>
                  <button className="w-full px-3 py-2 mt-4 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition">
                    {channel.status === 'connected' ? 'Manage' : 'Setup'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CAMPAIGNS TAB */}
        {activeTab === 'campaigns' && (
          <div className="space-y-4">
            {[
              { name: 'VIP Summer Sale', channel: 'Email + SMS', status: 'running', sent: 287, opened: 120, clicked: 42 },
              { name: 'Birthday Reminder - July', channel: 'WhatsApp', status: 'scheduled', sent: 0, opened: 0, clicked: 0 },
              { name: 'Winback Campaign (30+ days)', channel: 'Email', status: 'running', sent: 45, opened: 15, clicked: 3 },
            ].map((camp, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{camp.name}</h3>
                    <p className="text-xs text-gray-600">{camp.channel}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    camp.status === 'running' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {camp.status === 'running' ? '🔴 Running' : '⏱ Scheduled'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Sent</p>
                    <p className="text-lg font-bold">{camp.sent}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Opened</p>
                    <p className="text-lg font-bold text-blue-600">{camp.opened} ({((camp.opened/camp.sent)*100).toFixed(0) || 0}%)</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Clicked</p>
                    <p className="text-lg font-bold text-green-600">{camp.clicked}</p>
                  </div>
                  <button className="col-span-1 px-3 py-2 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200 transition">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TEMPLATES TAB */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            {[
              { name: 'Welcome Email', type: 'Email', vars: ['{{firstName}}', '{{discountCode}}'] },
              { name: 'Order Confirmation SMS', type: 'SMS', vars: ['{{orderNumber}}', '{{deliveryDate}}'] },
              { name: 'Delivery Tracking', type: 'WhatsApp', vars: ['{{driverName}}', '{{eta}}', '{{trackingLink}}'] },
              { name: 'Review Request', type: 'Email', vars: ['{{productName}}', '{{reviewLink}}'] },
              { name: 'Winback Push', type: 'Push', vars: ['{{offerAmount}}', '{{productCategory}}'] },
            ].map((template, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 flex justify-between items-center shadow-sm">
                <div>
                  <h4 className="font-semibold text-gray-900">{template.name}</h4>
                  <p className="text-xs text-gray-600">{template.type} • Variables: {template.vars.join(', ')}</p>
                </div>
                <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200 transition">
                  Edit
                </button>
              </div>
            ))}
            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
              + Create Template
            </button>
          </div>
        )}

        {/* SCHEDULE TAB */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">⏰ Schedule Messages for Optimal Times</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p>✓ Auto-detect best send time per customer (based on engagement history)</p>
                <p>✓ Schedule email blasts for 9am or 2pm in customer's timezone</p>
                <p>✓ SMS sends at customer's preferred time (configurable)</p>
                <p>✓ Birthday campaigns auto-send on customer's birthday</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Upcoming Scheduled Messages</h3>
              <div className="space-y-3">
                {[
                  { msg: 'Birthday email to 12 customers', time: 'Tomorrow 9am', status: 'Ready' },
                  { msg: 'Weekly review reminder SMS', time: 'Monday 7pm', status: 'Ready' },
                  { msg: 'Auto-reorder confirmation', time: 'Sunday 12am', status: 'Ready' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">{item.msg}</p>
                      <p className="text-xs text-gray-600">{item.time}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">{item.status}</span>
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
