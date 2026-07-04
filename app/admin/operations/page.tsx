'use client';

import Link from 'next/link';
import { operationalMetrics } from '@/lib/analyticsData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function OperationsAnalytics() {
  const COLORS = ['#B8995A', '#5A6B54'];
  const autoReorder = operationalMetrics.autoReorderMetrics;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Operations & Performance</h1>
            <p className="text-gray-600">Delivery, auto-reorder, fulfillment & KPIs</p>
          </div>
          <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Delivery Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {operationalMetrics.deliverySlots.map((slot, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{slot.slot} Slot</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Orders Delivered</p>
                  <p className="text-3xl font-bold text-gray-900">{slot.orders}</p>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">Success Rate</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${slot.successRate * 100}%` }}></div>
                    </div>
                    <span className="font-bold text-gray-900">{(slot.successRate * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Method Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Method Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={operationalMetrics.deliveryMethods}
                  dataKey="count"
                  nameKey="method"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {operationalMetrics.deliveryMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {operationalMetrics.deliveryMethods.map((method, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">{method.method}</span>
                  <span className="font-semibold text-gray-900">{method.count} orders</span>
                  <span className="text-gray-600">~{method.avgTime}min</span>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-Reorder Performance */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Auto-Reorder Program</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Adoption Rate</span>
                  <span className="font-bold text-gray-900">{(autoReorder.adoptionRate * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: `${autoReorder.adoptionRate * 100}%` }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{autoReorder.activeAutoReorders} of {autoReorder.eligible} active</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-2">Revenue Impact</p>
                <p className="text-2xl font-bold text-green-600">${autoReorder.autoReorderRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-600">{(autoReorder.percentOfTotal * 100).toFixed(1)}% of total revenue</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-2">Key Metrics</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Eligible Customers</span>
                    <span className="font-semibold">{autoReorder.eligible}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Active Auto-Orders</span>
                    <span className="font-semibold text-green-600">{autoReorder.activeAutoReorders}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Avg Revenue/Subscriber</span>
                    <span className="font-semibold">${(autoReorder.autoReorderRevenue / autoReorder.activeAutoReorders).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fulfillment KPIs */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Fulfillment KPIs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Orders Fulfilled (MTD)</p>
              <p className="text-3xl font-bold text-gray-900">54</p>
              <p className="text-xs text-gray-600 mt-1">1.8 orders/day avg</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">On-Time Delivery Rate</p>
              <div className="text-3xl font-bold text-green-600 mb-2">96%</div>
              <p className="text-xs text-gray-600">Industry standard: 95%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Avg Fulfillment Time</p>
              <p className="text-3xl font-bold text-blue-600">2.4h</p>
              <p className="text-xs text-gray-600">Order to delivery</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Customer Satisfaction</p>
              <p className="text-3xl font-bold text-yellow-600">4.8★</p>
              <p className="text-xs text-gray-600">Based on 34 reviews</p>
            </div>
          </div>
        </div>

        {/* Delivery Performance by Time */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Performance by Time Slot</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={operationalMetrics.deliverySlots}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="slot" />
              <YAxis yAxisId="left" label={{ value: 'Orders', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Success Rate (%)', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="orders" fill="#B8995A" name="Orders Delivered" />
              <Bar yAxisId="right" dataKey="successRate" fill="#5A6B54" name="Success Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Operational Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Operational Insights</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Auto-reorder program is strong at <strong>{(autoReorder.percentOfTotal * 100).toFixed(1)}% of revenue</strong> — consider expanding approval criteria to boost adoption</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>2pm slot has highest volume (24 orders) — consider adding 3pm option during peak season</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Signature delivery success rate <strong>94%</strong> — focus on photo delivery logistics for consistency</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span><strong>{autoReorder.eligible - autoReorder.activeAutoReorders}</strong> eligible customers not enrolled — personalized outreach could add ~${((autoReorder.eligible - autoReorder.activeAutoReorders) * (autoReorder.autoReorderRevenue / autoReorder.activeAutoReorders) * 0.3).toFixed(0)} annual revenue</span>
            </li>
          </ul>
        </div>

        {/* Process Metrics Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Operational Process Metrics</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Process</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Current</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Target</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">Order to Fulfillment Time</td>
                  <td className="text-right py-3 px-4 font-semibold">2.4h</td>
                  <td className="text-right py-3 px-4">3h</td>
                  <td className="text-right py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">EXCEEDING</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">On-Time Delivery Rate</td>
                  <td className="text-right py-3 px-4 font-semibold">96%</td>
                  <td className="text-right py-3 px-4">95%</td>
                  <td className="text-right py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">EXCEEDING</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">Customer Satisfaction</td>
                  <td className="text-right py-3 px-4 font-semibold">4.8★</td>
                  <td className="text-right py-3 px-4">4.5★</td>
                  <td className="text-right py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">EXCEEDING</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">Auto-Reorder Adoption</td>
                  <td className="text-right py-3 px-4 font-semibold">{(autoReorder.adoptionRate * 100).toFixed(1)}%</td>
                  <td className="text-right py-3 px-4">60%</td>
                  <td className="text-right py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">AT TARGET</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-900">Delivery Slot Capacity</td>
                  <td className="text-right py-3 px-4 font-semibold">54 orders/4 days</td>
                  <td className="text-right py-3 px-4">30/day</td>
                  <td className="text-right py-3 px-4">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">HEALTHY</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
