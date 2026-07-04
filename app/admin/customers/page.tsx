'use client';

import Link from 'next/link';
import { tierMetrics, churnAnalysis, customerAcquisition, tierProgression, learningDiscounts, ltvProjection } from '@/lib/analyticsData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function CustomerAnalytics() {
  const totalCustomers = tierMetrics.reduce((sum, t) => sum + t.count, 0);
  const atRiskPercent = (churnAnalysis.atRiskCustomers / totalCustomers * 100).toFixed(1);

  const COLORS = ['#B8995A', '#5A6B54', '#8B7355'];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Intelligence</h1>
            <p className="text-gray-600">Tiers, churn, LTV & acquisition metrics</p>
          </div>
          <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Total Customers</p>
            <h3 className="text-3xl font-bold text-gray-900">{totalCustomers}</h3>
            <p className="text-xs text-gray-500 mt-2">{churnAnalysis.activeNow} active now</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Churn Rate</p>
            <h3 className="text-3xl font-bold text-gray-900">{(churnAnalysis.inactiveRate * 100).toFixed(2)}%</h3>
            <p className="text-xs text-gray-500 mt-2">{churnAnalysis.inactive6Months} inactive</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">At-Risk Customers</p>
            <h3 className="text-3xl font-bold text-orange-600">{churnAnalysis.atRiskCustomers}</h3>
            <p className="text-xs text-gray-500 mt-2">{atRiskPercent}% of active</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Repeat Rate</p>
            <h3 className="text-3xl font-bold text-green-600">68%</h3>
            <p className="text-xs text-gray-500 mt-2">YTD average</p>
          </div>
        </div>

        {/* Tier Performance Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tier Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Tier</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Customers</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Spent</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Avg Order</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Return Rate</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Churn Rate</th>
                </tr>
              </thead>
              <tbody>
                {tierMetrics.map((tier, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold text-gray-900">{tier.tier}</td>
                    <td className="text-right py-3 px-4 text-gray-900">{tier.count}</td>
                    <td className="text-right py-3 px-4 font-semibold text-gray-900">${tier.totalSpent.toLocaleString()}</td>
                    <td className="text-right py-3 px-4 text-gray-900">${tier.avgOrderValue}</td>
                    <td className="text-right py-3 px-4">
                      <span className="font-semibold text-green-600">{(tier.returnRate * 100).toFixed(0)}%</span>
                    </td>
                    <td className="text-right py-3 px-4">
                      <span className={`font-semibold ${tier.churnRate < 0.03 ? 'text-green-600' : 'text-orange-600'}`}>
                        {(tier.churnRate * 100).toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Customer Acquisition by Channel */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Acquisition by Channel (YTD)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerAcquisition}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="new" fill="#B8995A" name="New Customers" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-xs">
              {customerAcquisition.map((channel, i) => (
                <div key={i} className="flex justify-between text-gray-600">
                  <span>{channel.channel}</span>
                  <span className="font-semibold">{(channel.conversion * 100).toFixed(0)}% conversion</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Churn Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Churn Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={churnAnalysis.monthlyChurnTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${(value * 100).toFixed(2)}%`} />
                <Line type="monotone" dataKey="churn" stroke="#FF6B6B" strokeWidth={2} name="Churn Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LTV Projections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(ltvProjection).map(([tier, data]) => (
            <div key={tier} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">{tier} Tier - LTV Projection</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Current LTV</p>
                  <p className="text-2xl font-bold text-gray-900">${data.current}</p>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-600 mb-1">12-Month Projection</p>
                  <p className="text-xl font-bold text-blue-600">${data.projected12m}</p>
                  <p className="text-xs text-green-600">+{(((data.projected12m - data.current) / data.current) * 100).toFixed(0)}%</p>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-600 mb-1">24-Month Projection</p>
                  <p className="text-xl font-bold text-green-600">${data.projected24m}</p>
                  <p className="text-xs text-green-600">+{(((data.projected24m - data.current) / data.current) * 100).toFixed(0)}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tier Progression */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tier Progression Paths</h2>
            <div className="space-y-4">
              {tierProgression.map((prog, i) => (
                <div key={i} className="border-l-4 border-blue-600 pl-4 py-2">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-900">{prog.from} → {prog.to}</span>
                    <span className="text-sm font-bold text-blue-600">{prog.count} customers</span>
                  </div>
                  <p className="text-xs text-gray-600">Average time: {prog.timeMonths} months</p>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Discounts Adoption */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Discount Program</h2>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Overall Adoption</span>
                <span className="font-bold text-gray-900">{(learningDiscounts.uptakeRate * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: `${learningDiscounts.uptakeRate * 100}%` }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">{learningDiscounts.claimedCount} of {learningDiscounts.eligible} eligible customers</p>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-900">Uptake by Tier</p>
              {learningDiscounts.byTier.map((tier, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{tier.tier}</span>
                    <span className="font-semibold">{(tier.uptake * 100).toFixed(0)}% • ${tier.saved} saved</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${tier.uptake * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* At-Risk Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Churn Analysis & Prevention</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Inactive 6+ Months</p>
              <p className="text-3xl font-bold text-red-600">{churnAnalysis.inactive6Months}</p>
              <p className="text-xs text-gray-600">{(churnAnalysis.inactiveRate * 100).toFixed(2)}% of base</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">At-Risk (1-3 Months)</p>
              <p className="text-3xl font-bold text-orange-600">{churnAnalysis.atRiskCustomers}</p>
              <p className="text-xs text-gray-600">Need engagement</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Healthy & Active</p>
              <p className="text-3xl font-bold text-green-600">{churnAnalysis.activeNow}</p>
              <p className="text-xs text-gray-600">Purchased last 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
