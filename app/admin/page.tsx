'use client';
// @ts-nocheck

import Link from 'next/link';
import { useState } from 'react';
import { monthlyMetrics, tierMetrics, productMetrics, operationalMetrics, revenueTrends } from '@/lib/analyticsData';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState('mtd');
  const mtd = monthlyMetrics.mtd;
  const ytd = monthlyMetrics.ytd;
  const yoy = ((ytd.revenue - monthlyMetrics.lastYear.revenue) / monthlyMetrics.lastYear.revenue * 100).toFixed(1);

  const topTier = tierMetrics[0];
  const totalCustomers = tierMetrics.reduce((sum, t) => sum + t.count, 0);

  const COLORS = ['#B8995A', '#5A6B54', '#8B7355'];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Real-time business intelligence for AFUVAI Floral Society</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm">
              🔔 Alerts (2)
            </button>
            <Link href="/admin/reports" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm">
              📊 Reports
            </Link>
            <Link href="/admin/alerts" className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium text-sm">
              ⚙️ Manage Alerts
            </Link>
          </div>
        </div>

        {/* Date Range Selector */}
        <div className="flex gap-2 mb-8">
          {['mtd', 'qtd', 'ytd', 'custom'].map(range => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                dateRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-900 hover:border-gray-300'
              }`}
            >
              {range === 'mtd' ? 'MTD' : range === 'qtd' ? 'QTD' : range === 'ytd' ? 'YTD' : 'Custom'}
            </button>
          ))}
        </div>

        {/* KPI Cards - Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* MTD Revenue */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">MTD Revenue</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">${mtd.revenue.toLocaleString()}</h3>
            <p className="text-xs text-gray-500">{mtd.orders} orders</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link href="/admin/revenue" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View Details →
              </Link>
            </div>
          </div>

          {/* YTD Revenue */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">YTD Revenue</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">${ytd.revenue.toLocaleString()}</h3>
            <p className="text-xs text-green-600">+{yoy}% vs 2025</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link href="/admin/revenue" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Year Comparison →
              </Link>
            </div>
          </div>

          {/* Active Customers */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Active Customers</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{totalCustomers}</h3>
            <p className="text-xs text-gray-500">+{mtd.newCustomers} this month</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link href="/admin/customers" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View Tiers →
              </Link>
            </div>
          </div>

          {/* Avg Order Value */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Avg Order Value</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">${mtd.avgOrderValue}</h3>
            <p className="text-xs text-gray-500">YTD: ${ytd.avgOrderValue}</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link href="/admin/products" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Product Analysis →
              </Link>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Trend */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">MTD Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#B8995A" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="orders" stroke="#5A6B54" strokeWidth={2} name="Orders" yAxisId="right" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Tier Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tier Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tierMetrics}
                  dataKey="count"
                  nameKey="tier"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {tierMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-sm">
              {tierMetrics.map((tier, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-600">{tier.tier}</span>
                  <span className="font-semibold">{tier.count} ({((tier.count / totalCustomers) * 100).toFixed(1)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Repeat Purchase */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Repeat Purchase Rate</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">MTD</span>
                  <span className="font-bold text-gray-900">{(mtd.repeatPurchaseRate * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${mtd.repeatPurchaseRate * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">YTD</span>
                  <span className="font-bold text-gray-900">{(ytd.repeatPurchaseRate * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${ytd.repeatPurchaseRate * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Churn Rate */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Churn Rate</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">MTD</span>
                  <span className="font-bold text-gray-900">{(mtd.churnRate * 100).toFixed(2)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: `${Math.min(mtd.churnRate * 100 * 10, 100)}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">YTD</span>
                  <span className="font-bold text-gray-900">{(ytd.churnRate * 100).toFixed(2)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${Math.min(ytd.churnRate * 100 * 10, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-Reorder Adoption */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Auto-Reorder Adoption</h3>
            <div className="mb-4">
              <div className="text-3xl font-bold text-gray-900 mb-1">{(operationalMetrics.autoReorderMetrics.adoptionRate * 100).toFixed(0)}%</div>
              <p className="text-xs text-gray-600">{operationalMetrics.autoReorderMetrics.activeAutoReorders} of {operationalMetrics.autoReorderMetrics.eligible} active</p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-600">Revenue from auto-reorder:</p>
              <p className="text-lg font-bold text-green-600">${operationalMetrics.autoReorderMetrics.autoReorderRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-600">({(operationalMetrics.autoReorderMetrics.percentOfTotal * 100).toFixed(1)}% of total)</p>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Products by Revenue (YTD)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productMetrics.slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="revenue" fill="#B8995A" name="Total Revenue" />
              <Bar dataKey="autoReorderRevenue" fill="#5A6B54" name="Auto-Reorder Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tier Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {tierMetrics.map((tier, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{tier.tier} Tier</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Customers</span>
                  <span className="font-bold text-gray-900">{tier.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Spent (YTD)</span>
                  <span className="font-bold text-gray-900">${tier.totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Order</span>
                  <span className="font-bold text-gray-900">${tier.avgOrderValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Repeat Rate</span>
                  <span className="font-bold text-green-600">{(tier.returnRate * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Churn Rate</span>
                  <span className={`font-bold ${tier.churnRate < 0.03 ? 'text-green-600' : 'text-red-600'}`}>
                    {(tier.churnRate * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
              <Link href="/admin/customers" className="mt-4 block text-sm font-medium text-blue-600 hover:text-blue-700">
                View Customers →
              </Link>
            </div>
          ))}
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Analytics & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <Link href="/admin/revenue" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <h3 className="font-semibold text-gray-900 mb-1">📊 Revenue Analytics</h3>
              <p className="text-xs text-gray-600">MTD, YTD, forecasts & trends</p>
            </Link>
            <Link href="/admin/customers" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <h3 className="font-semibold text-gray-900 mb-1">👥 Customer Intelligence</h3>
              <p className="text-xs text-gray-600">Tiers, churn, LTV & acquisition</p>
            </Link>
            <Link href="/admin/products" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <h3 className="font-semibold text-gray-900 mb-1">🌸 Product Performance</h3>
              <p className="text-xs text-gray-600">Top sellers, margins & trends</p>
            </Link>
            <Link href="/admin/operations" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <h3 className="font-semibold text-gray-900 mb-1">⚙️ Operations</h3>
              <p className="text-xs text-gray-600">Delivery, auto-reorder & KPIs</p>
            </Link>
            <Link href="/admin/reports" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <h3 className="font-semibold text-gray-900 mb-1">📋 Reports</h3>
              <p className="text-xs text-gray-600">Export CSV/PDF & email</p>
            </Link>
            <Link href="/admin/alerts" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <h3 className="font-semibold text-gray-900 mb-1">🔔 Alerts</h3>
              <p className="text-xs text-gray-600">KPI rules & events</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
