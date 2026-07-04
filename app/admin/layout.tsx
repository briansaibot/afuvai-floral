import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8">AFUVAI Admin</h2>
        <nav className="space-y-4">
          <Link
            href="/admin"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition font-medium"
          >
            🃏 Dashboard
          </Link>
          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs font-semibold text-gray-400 px-4 mb-3">ANALYTICS</p>
            <Link
              href="/admin/revenue"
              className="block px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              💰 Revenue
            </Link>
            <Link
              href="/admin/customers"
              className="block px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              👥 Customers
            </Link>
            <Link
              href="/admin/products"
              className="block px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              🌸 Products
            </Link>
            <Link
              href="/admin/operations"
              className="block px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              ⚙️ Operations
            </Link>
          </div>
          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs font-semibold text-gray-400 px-4 mb-3">TOOLS</p>
            <Link
              href="/admin/orders"
              className="block px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              📋 Orders
            </Link>
            <Link
              href="/admin/reports"
              className="block px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              📋 Reports
            </Link>
            <Link
              href="/admin/alerts"
              className="block px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              🔔 Alerts
            </Link>
          </div>
          <Link
            href="/"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition mt-8 border-t border-gray-700 pt-4"
          >
            ← Back to Store
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
