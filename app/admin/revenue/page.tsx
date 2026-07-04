'use client';

import Link from 'next/link';
import { monthlyMetrics, revenueTrends, seasonalTrends, tierMetrics } from '@/lib/analyticsData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RevenueAnalytics() {
  const mtd = monthlyMetrics.mtd;
  const ytd = monthlyMetrics.ytd;
  const lastYear = monthlyMetrics.lastYear;
  const yoyGrowth = ((ytd.revenue - lastYear.revenue) / lastYear.revenue * 100);

  const tierRevenue = tierMetrics.map(t => ({
    tier: t.tier,
    revenue: t.totalSpent,
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Revenue Analytics</h1>
            <p className="text-gray-600">Detailed revenue breakdown, trends & forecasts</p>
          </div>
          <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Period Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">MTD Revenue</p>
            <h3 className="text-2xl font-bold text-gray-900">${mtd.revenue.toLocaleString()}</h3>
            <p className="text-xs text-gray-600 mt-2">{mtd.orders} orders</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">YTD Revenue</p>
            <h3 className="text-2xl font-bold text-gray-900">${ytd.revenue.toLocaleString()}</h3>
            <p className={`text-xs font-semibold mt-2 ${yoyGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {yoyGrowth > 0 ? '+' : ''}{yoyGrowth.toFixed(1)}% vs 2025
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">2025 Revenue</p>
            <h3 className="text-2xl font-bold text-gray-900">${lastYear.revenue.toLocaleString()}</h3>
            <p className="text-xs text-gray-600 mt-2">{lastYear.orders} orders</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">YTD Growth</p>
            <h3 className="text-2xl font-bold text-green-600">${(ytd.revenue - lastYear.revenue).toLocaleString()}</h3>
            <p className="text-xs text-gray-600 mt-2">{((ytd.revenue / ytd.orders) - (lastYear.revenue / lastYear.orders)).toFixed(2)}/order</p>
          </div>
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Revenue Trend (MTD)</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={revenueTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#B8995A" strokeWidth={2} name="Revenue ($)" />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#5A6B54" strokeWidth={2} name="Orders (#)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Seasonal Trends */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Seasonal Trends (Last 6 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={seasonalTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#B8995A" name="Monthly Revenue" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {seasonalTrends.map((m, i) => (
              <div key={i} className="border border-gray-200 rounded p-2">
                <p className="font-semibold text-gray-900">{m.month}</p>
                <p className="text-gray-600">${m.revenue.toLocaleString()}</p>
                <p className="text-gray-500">{m.context}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Tier */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Tier (YTD)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tierRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tier" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Bar dataKey="revenue" fill="#B8995A" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tier Breakdown Table */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tier Performance</h2>
            <div className="space-y-4">
              {tierMetrics.map((tier, i) => {
                const tierPercent = (tier.totalSpent / tierRevenue.reduce((sum, t) => sum + t.revenue, 0) * 100).toFixed(1);
                return (
                  <div key={i} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{tier.tier}</h3>
                      <span className="text-sm font-bold text-gray-900">${tier.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${tierPercent}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{tierPercent}% of total</span>
                      <span>{tier.count} customers</span>
                      <span>Avg: ${tier.avgOrderValue}/order</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Financial Metrics Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Financial Metrics</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Metric</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">MTD</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">YTD</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">Total Revenue</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900">${mtd.revenue.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900">${ytd.revenue.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 font-semibold text-green-600">+{yoyGrowth.toFixed(1)}%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">Orders</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900">{mtd.orders}</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900">{ytd.orders}</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-600">
                    {(((ytd.orders - lastYear.orders) / lastYear.orders) * 100).toFixed(1)}%
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">Avg Order Value</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900">${mtd.avgOrderValue}</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900">${ytd.avgOrderValue}</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-600">0%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">New Customers</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900">{mtd.newCustomers}</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900">{ytd.newCustomers}</td>
                  <td className="text-right py-3 px-4 font-semibold text-green-600">+{(((ytd.newCustomers - lastYear.orders / 12) / (lastYear.orders / 12)) * 100).toFixed(0)}%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-900">Repeat Purchase Rate</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900">{(mtd.repeatPurchaseRate * 100).toFixed(1)}%</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900">{(ytd.repeatPurchaseRate * 100).toFixed(1)}%</td>
                  <td className="text-right py-3 px-4 font-semibold text-green-600">+{((ytd.repeatPurchaseRate - mtd.repeatPurchaseRate) * 100).toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
