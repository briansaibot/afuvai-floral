'use client';

import Link from 'next/link';
import { useState } from 'react';
import { defaultAlerts, recentAlertEvents } from '@/lib/alertsConfig';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(defaultAlerts);
  const [events, setEvents] = useState(recentAlertEvents);
  const [showNewAlert, setShowNewAlert] = useState(false);
  const [unreadCount, setUnreadCount] = useState(events.filter(e => !e.read).length);

  const markAllAsRead = () => {
    setEvents(events.map(e => ({ ...e, read: true })));
    setUnreadCount(0);
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(a => 
      a.id === id ? { ...a, enabled: !a.enabled } : a
    ));
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alerts & Notifications</h1>
            <p className="text-gray-600">Configure KPI alerts and review recent events</p>
          </div>
          <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Alert Events - Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Alert Events</h2>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Mark all as read ({unreadCount})
              </button>
            )}
          </div>

          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No alert events</p>
          ) : (
            <div className="space-y-3">
              {events.map(event => {
                const alert = alerts.find(a => a.id === event.alertId);
                return (
                  <div
                    key={event.id}
                    className={`border-l-4 p-4 rounded-r-lg flex justify-between items-start ${getAlertColor(event.severity)} ${
                      !event.read ? 'font-semibold' : 'opacity-75'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex gap-2 items-start">
                        <span className="text-xl">{getAlertIcon(event.severity)}</span>
                        <div>
                          <p className="font-semibold">{alert?.name}</p>
                          <p className="text-sm">{event.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(event.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="ml-4 text-xs hover:opacity-70"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Alert Rules Configuration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Alert Rules ({alerts.filter(a => a.enabled).length} active)</h2>
            <button
              onClick={() => setShowNewAlert(!showNewAlert)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
            >
              + Create Alert
            </button>
          </div>

          {showNewAlert && (
            <div className="mb-6 p-4 border-2 border-dashed border-green-300 rounded-lg bg-green-50">
              <h3 className="font-semibold text-gray-900 mb-3">New Alert Rule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Alert name" className="px-4 py-2 border border-gray-300 rounded-lg" />
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Revenue</option>
                  <option>Customer</option>
                  <option>Product</option>
                  <option>Operational</option>
                </select>
                <input type="number" placeholder="Threshold value" className="px-4 py-2 border border-gray-300 rounded-lg" />
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>&gt;</option>
                  <option>&lt;</option>
                  <option>==</option>
                  <option>&gt;=</option>
                  <option>&lt;=</option>
                </select>
                <input type="email" placeholder="Email to notify" className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2" />
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                  Create
                </button>
                <button
                  onClick={() => setShowNewAlert(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Alert Rules Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Alert Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Condition</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Notify</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Triggered</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map(alert => (
                  <tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleAlert(alert.id)}
                        className={`inline-block w-10 h-6 rounded-full transition ${
                          alert.enabled ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition ${
                            alert.enabled ? 'ml-auto mt-0.5' : 'ml-0.5 mt-0.5'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">{alert.name}</td>
                    <td className="py-3 px-4">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">
                        {alert.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {alert.condition} {alert.operator} {alert.threshold}
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {alert.notifyEmail ? <span>{alert.notifyEmail.split('@')[0]}</span> : <span className="text-gray-400">—</span>}
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-600">
                      {alert.lastTriggered ? new Date(alert.lastTriggered).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Active Alerts</p>
            <p className="text-3xl font-bold text-gray-900">{alerts.filter(a => a.enabled).length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Events (Last 7 Days)</p>
            <p className="text-3xl font-bold text-gray-900">{events.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Unread Notifications</p>
            <p className="text-3xl font-bold text-orange-600">{unreadCount}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Total Triggered</p>
            <p className="text-3xl font-bold text-gray-900">
              {events.filter(e => e.severity !== 'info').length}
            </p>
          </div>
        </div>

        {/* Alert Best Practices */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-3">💡 Alert Best Practices</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Set revenue alerts 5-10% below your daily/weekly average to catch unusual trends early</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Configure churn alerts at 4-5% monthly — this is your early warning system for customer health</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Create milestone alerts for auto-reorder adoption — celebrate wins and identify growth gaps</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Delivery success alerts at 95%+ — operational excellence is your competitive edge</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
