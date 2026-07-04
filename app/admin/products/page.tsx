'use client';

import Link from 'next/link';
import { productMetrics, operationalMetrics } from '@/lib/analyticsData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ProductAnalytics() {
  const totalRevenue = productMetrics.reduce((sum, p) => sum + p.revenue, 0);
  const totalUnits = productMetrics.reduce((sum, p) => sum + p.units, 0);
  const avgMargin = (productMetrics.reduce((sum, p) => sum + p.margin, 0) / productMetrics.length * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Performance</h1>
            <p className="text-gray-600">Revenue, margins, auto-reorder impact & trends</p>
          </div>
          <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Total Product Revenue</p>
            <h3 className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</h3>
            <p className="text-xs text-gray-600 mt-2">{productMetrics.length} active products</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Units Sold (YTD)</p>
            <h3 className="text-3xl font-bold text-gray-900">{totalUnits}</h3>
            <p className="text-xs text-gray-600 mt-2">${(totalRevenue / totalUnits).toFixed(2)} avg per unit</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Average Margin</p>
            <h3 className="text-3xl font-bold text-gray-900">{avgMargin}%</h3>
            <p className="text-xs text-gray-600 mt-2">Healthy range: 48-55%</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Auto-Reorder Revenue</p>
            <h3 className="text-3xl font-bold text-green-600">
              ${productMetrics.reduce((sum, p) => sum + p.autoReorderRevenue, 0).toLocaleString()}
            </h3>
            <p className="text-xs text-gray-600 mt-2">
              {((productMetrics.reduce((sum, p) => sum + p.autoReorderRevenue, 0) / totalRevenue) * 100).toFixed(1)}% of total
            </p>
          </div>
        </div>

        {/* Revenue vs Auto-Reorder Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown: Total vs Auto-Reorder</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={productMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="revenue" fill="#B8995A" name="Total Revenue" />
              <Bar dataKey="autoReorderRevenue" fill="#5A6B54" name="Auto-Reorder Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Performance Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Products (YTD)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Product</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Revenue</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Units</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Avg Price</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Margin</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Auto-Reorder %</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Top Tier</th>
                </tr>
              </thead>
              <tbody>
                {productMetrics.map((product, i) => {
                  const autoReorderPercent = (product.autoReorderRevenue / product.revenue * 100).toFixed(0);
                  return (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 font-medium">{product.name}</td>
                      <td className="text-right py-3 px-4 font-semibold text-gray-900">${product.revenue.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 text-gray-900">{product.units}</td>
                      <td className="text-right py-3 px-4 text-gray-900">${(product.revenue / product.units).toFixed(2)}</td>
                      <td className="text-right py-3 px-4">
                        <span className={`font-semibold ${product.margin > 0.51 ? 'text-green-600' : 'text-orange-600'}`}>
                          {(product.margin * 100).toFixed(0)}%
                        </span>
                      </td>
                      <td className="text-right py-3 px-4">
                        <span className="font-semibold text-blue-600">{autoReorderPercent}%</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          product.tier === 'Whale' ? 'bg-purple-100 text-purple-700' :
                          product.tier === 'VIP' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {product.tier}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Margin Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Highest Margin</h3>
            {productMetrics.sort((a, b) => b.margin - a.margin).slice(0, 1).map((p, i) => (
              <div key={i}>
                <p className="text-gray-900 font-semibold mb-1">{p.name}</p>
                <p className="text-2xl font-bold text-green-600 mb-2">{(p.margin * 100).toFixed(0)}%</p>
                <p className="text-xs text-gray-600">${p.revenue.toLocaleString()} revenue</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Best Seller (Units)</h3>
            {productMetrics.sort((a, b) => b.units - a.units).slice(0, 1).map((p, i) => (
              <div key={i}>
                <p className="text-gray-900 font-semibold mb-1">{p.name}</p>
                <p className="text-2xl font-bold text-blue-600 mb-2">{p.units} units</p>
                <p className="text-xs text-gray-600">${(p.revenue / p.units).toFixed(2)}/unit avg</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Auto-Reorder Leader</h3>
            {productMetrics.sort((a, b) => b.autoReorderRevenue - a.autoReorderRevenue).slice(0, 1).map((p, i) => (
              <div key={i}>
                <p className="text-gray-900 font-semibold mb-1">{p.name}</p>
                <p className="text-2xl font-bold text-green-600 mb-2">${p.autoReorderRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-600">{((p.autoReorderRevenue / p.revenue) * 100).toFixed(0)}% of product revenue</p>
              </div>
            ))}
          </div>
        </div>

        {/* Margin Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Margin Distribution</h2>
          <div className="space-y-3">
            {productMetrics.map((product, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-900 font-semibold">{product.name}</span>
                  <span className="font-bold text-gray-900">{(product.margin * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${product.margin * 100}%`,
                      backgroundColor: product.margin > 0.51 ? '#10b981' : product.margin > 0.49 ? '#f59e0b' : '#ef4444'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
