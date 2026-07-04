'use client';

import Link from 'next/link';
import { useState } from 'react';
import { monthlyMetrics, tierMetrics, productMetrics, churnAnalysis } from '@/lib/analyticsData';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<'revenue' | 'customer' | 'product' | 'operational' | null>(null);
  const [dateRange, setDateRange] = useState<'mtd' | 'qtd' | 'ytd' | 'custom'>('mtd');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const generateCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          const escaped = String(value).includes(',') ? `"${value}"` : value;
          return escaped;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const generatePDF = (title: string, content: string) => {
    const pageContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #1A1A14; border-bottom: 2px solid #B8995A; padding-bottom: 10px; }
          h2 { color: #5A6B54; margin-top: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          th { background-color: #f5f5f5; font-weight: bold; }
          .timestamp { color: #666; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        ${content}
        <div class="timestamp">Generated on ${new Date().toLocaleString()}</div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow?.document.write(pageContent);
    printWindow?.document.close();
    printWindow?.focus();
    setTimeout(() => {
      printWindow?.print();
      printWindow?.close();
    }, 250);
  };

  const exportRevenueReport = () => {
    const data = [
      { metric: 'MTD Revenue', value: monthlyMetrics.mtd.revenue, period: 'Month to Date' },
      { metric: 'MTD Orders', value: monthlyMetrics.mtd.orders, period: 'Month to Date' },
      { metric: 'YTD Revenue', value: monthlyMetrics.ytd.revenue, period: 'Year to Date' },
      { metric: 'YTD Orders', value: monthlyMetrics.ytd.orders, period: 'Year to Date' },
      { metric: 'Avg Order Value', value: monthlyMetrics.mtd.avgOrderValue, period: 'Current' },
      { metric: '2025 Revenue', value: monthlyMetrics.lastYear.revenue, period: 'Last Year' },
    ];
    generateCSV(data, 'revenue-report');
  };

  const exportCustomerReport = () => {
    const data = tierMetrics.map(tier => ({
      'Tier': tier.tier,
      'Customers': tier.count,
      'Total Spent': tier.totalSpent,
      'Avg Order Value': tier.avgOrderValue,
      'Return Rate': `${(tier.returnRate * 100).toFixed(1)}%`,
      'Churn Rate': `${(tier.churnRate * 100).toFixed(2)}%`,
    }));
    generateCSV(data, 'customer-report');
  };

  const exportProductReport = () => {
    const data = productMetrics.map(product => ({
      'Product': product.name,
      'Revenue': product.revenue,
      'Units': product.units,
      'Margin %': (product.margin * 100).toFixed(1),
      'Auto-Reorder Revenue': product.autoReorderRevenue,
      'Top Tier': product.tier,
    }));
    generateCSV(data, 'product-report');
  };

  const generateRevenueHTML = () => {
    return `
      <h2>Revenue Summary</h2>
      <table>
        <tr><th>Period</th><th>Revenue</th><th>Orders</th><th>Avg Order</th></tr>
        <tr>
          <td>MTD (Jul 1-4)</td>
          <td>$${monthlyMetrics.mtd.revenue.toLocaleString()}</td>
          <td>${monthlyMetrics.mtd.orders}</td>
          <td>$${monthlyMetrics.mtd.avgOrderValue}</td>
        </tr>
        <tr>
          <td>YTD (Jan-Jul)</td>
          <td>$${monthlyMetrics.ytd.revenue.toLocaleString()}</td>
          <td>${monthlyMetrics.ytd.orders}</td>
          <td>$${monthlyMetrics.ytd.avgOrderValue}</td>
        </tr>
        <tr>
          <td>2025 Full Year</td>
          <td>$${monthlyMetrics.lastYear.revenue.toLocaleString()}</td>
          <td>${monthlyMetrics.lastYear.orders}</td>
          <td>$${(monthlyMetrics.lastYear.revenue / monthlyMetrics.lastYear.orders).toFixed(2)}</td>
        </tr>
      </table>
      <h2>Key Metrics</h2>
      <ul>
        <li>YoY Growth: +${((monthlyMetrics.ytd.revenue - monthlyMetrics.lastYear.revenue) / monthlyMetrics.lastYear.revenue * 100).toFixed(1)}%</li>
        <li>Repeat Purchase Rate: ${(monthlyMetrics.ytd.repeatPurchaseRate * 100).toFixed(1)}%</li>
        <li>Monthly Churn: ${(monthlyMetrics.mtd.churnRate * 100).toFixed(2)}%</li>
      </ul>
    `;
  };

  const generateCustomerHTML = () => {
    return `
      <h2>Customer Tier Analysis</h2>
      <table>
        <tr>
          <th>Tier</th>
          <th>Count</th>
          <th>Total Spent</th>
          <th>Avg Order</th>
          <th>Return Rate</th>
          <th>Churn</th>
        </tr>
        ${tierMetrics.map(t => `
          <tr>
            <td>${t.tier}</td>
            <td>${t.count}</td>
            <td>$${t.totalSpent.toLocaleString()}</td>
            <td>$${t.avgOrderValue}</td>
            <td>${(t.returnRate * 100).toFixed(0)}%</td>
            <td>${(t.churnRate * 100).toFixed(2)}%</td>
          </tr>
        `).join('')}
      </table>
      <h2>Health Indicators</h2>
      <ul>
        <li>Total Customers: ${tierMetrics.reduce((s, t) => s + t.count, 0)}</li>
        <li>Inactive 6+ Months: ${churnAnalysis.inactive6Months}</li>
        <li>At-Risk (1-3 months): ${churnAnalysis.atRiskCustomers}</li>
      </ul>
    `;
  };

  const generateProductHTML = () => {
    return `
      <h2>Product Performance</h2>
      <table>
        <tr>
          <th>Product</th>
          <th>Revenue</th>
          <th>Units</th>
          <th>Margin</th>
          <th>Auto-Reorder %</th>
        </tr>
        ${productMetrics.map(p => `
          <tr>
            <td>${p.name}</td>
            <td>$${p.revenue.toLocaleString()}</td>
            <td>${p.units}</td>
            <td>${(p.margin * 100).toFixed(0)}%</td>
            <td>${((p.autoReorderRevenue / p.revenue) * 100).toFixed(0)}%</td>
          </tr>
        `).join('')}
      </table>
    `;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Export</h1>
            <p className="text-gray-600">Generate, download, and email business reports</p>
          </div>
          <Link href="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Date Range Selector */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Period</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <button
              onClick={() => setDateRange('mtd')}
              className={`p-3 rounded-lg border transition ${
                dateRange === 'mtd'
                  ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Month to Date
            </button>
            <button
              onClick={() => setDateRange('qtd')}
              className={`p-3 rounded-lg border transition ${
                dateRange === 'qtd'
                  ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Quarter to Date
            </button>
            <button
              onClick={() => setDateRange('ytd')}
              className={`p-3 rounded-lg border transition ${
                dateRange === 'ytd'
                  ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Year to Date
            </button>
            <button
              onClick={() => setDateRange('custom')}
              className={`p-3 rounded-lg border transition ${
                dateRange === 'custom'
                  ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Custom Range
            </button>
          </div>

          {dateRange === 'custom' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Start date"
              />
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="End date"
              />
            </div>
          )}
        </div>

        {/* Report Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Revenue Report */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">📊 Revenue Report</h2>
            <p className="text-gray-600 text-sm mb-4">MTD/YTD revenue, orders, AOV & YoY comparison</p>
            <div className="space-y-2">
              <button
                onClick={exportRevenueReport}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                📥 Download CSV
              </button>
              <button
                onClick={() => generatePDF('Revenue Report', generateRevenueHTML())}
                className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
              >
                📄 Print PDF
              </button>
            </div>
          </div>

          {/* Customer Report */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">👥 Customer Report</h2>
            <p className="text-gray-600 text-sm mb-4">Tier breakdown, churn, repeat rates & LTV</p>
            <div className="space-y-2">
              <button
                onClick={exportCustomerReport}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                📥 Download CSV
              </button>
              <button
                onClick={() => generatePDF('Customer Report', generateCustomerHTML())}
                className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
              >
                📄 Print PDF
              </button>
            </div>
          </div>

          {/* Product Report */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">🌸 Product Report</h2>
            <p className="text-gray-600 text-sm mb-4">Top sellers, margins, auto-reorder impact</p>
            <div className="space-y-2">
              <button
                onClick={exportProductReport}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                📥 Download CSV
              </button>
              <button
                onClick={() => generatePDF('Product Report', generateProductHTML())}
                className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
              >
                📄 Print PDF
              </button>
            </div>
          </div>

          {/* Scheduled Reports */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">📮 Scheduled Reports</h2>
            <p className="text-gray-600 text-sm mb-4">Auto-email reports on a schedule</p>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                ⚙️ Configure Schedules
              </button>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Active:</span> Weekly Digest (Mon 9am)
              </p>
            </div>
          </div>
        </div>

        {/* Email Report */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📧 Email Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Recipient</label>
              <input
                type="email"
                defaultValue="brian@afuvai.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Report Type</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Revenue</option>
                <option>Customer</option>
                <option>Product</option>
                <option>All Reports</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                Send Now
              </button>
            </div>
          </div>
        </div>

        {/* Scheduled Emails */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Emails</h2>
          <div className="space-y-3">
            {[
              { name: 'Weekly Digest', day: 'Monday', time: '9:00 AM', reports: 'Revenue + Customer', status: 'Active' },
              { name: 'Monthly Summary', day: 'Last day of month', time: '5:00 PM', reports: 'All Reports', status: 'Active' },
            ].map((schedule, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">{schedule.name}</p>
                  <p className="text-sm text-gray-600">{schedule.day} at {schedule.time}</p>
                  <p className="text-xs text-gray-500">{schedule.reports}</p>
                </div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  {schedule.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
