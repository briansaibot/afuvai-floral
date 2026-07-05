'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('adminUser');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        router.push('/admin/login');
      }
    } else {
      router.push('/admin/login');
    }
    setLoading(false);
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminUser');

    // Clear session cookie via API
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }

    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8">AFUVAI Admin</h2>
        <nav className="space-y-1 text-sm">
          <Link href="/admin" className="block px-4 py-2 rounded hover:bg-gray-800 transition font-medium">
            📊 Main Dashboard
          </Link>
          <Link href="/admin/live-dashboard" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
            🔴 Live Dashboard
          </Link>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs font-semibold text-gray-400 px-4 mb-2">CUSTOMER 360</p>
            <Link href="/admin/customers" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
              👥 All Customers
            </Link>
            <Link href="/admin/customers/cust-1" className="block px-4 py-2 rounded hover:bg-gray-800 transition text-gray-400 text-xs">
              └ Sample: Wendy N.
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs font-semibold text-gray-400 px-4 mb-2">ANALYTICS</p>
            <Link href="/admin/revenue" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
              💰 Revenue
            </Link>
            <Link href="/admin/products" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
              🌸 Products
            </Link>
            <Link href="/admin/operations" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
              ⚙️ Operations
            </Link>
            <Link href="/admin/advanced-analytics" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
              📈 Advanced
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs font-semibold text-gray-400 px-4 mb-2">BUSINESS</p>
            <Link href="/admin/operations-suite" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
              ⚡ Operations Suite
            </Link>
            <Link href="/admin/messaging" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
              📧 Messaging Hub
            </Link>
            <Link href="/admin/ai-personalization" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
              🤖 AI & Personalization
            </Link>
            <Link href="/admin/integrations" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
              🔗 Integrations
            </Link>
            <Link href="/admin/reports" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
              📋 Reports
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs font-semibold text-gray-400 px-4 mb-2">SECURITY</p>
            <Link href="/admin/compliance" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
              🔐 Compliance
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs font-semibold text-gray-400 px-4 mb-2">DATA</p>
            <Link href="/admin/orders" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
              📋 Orders
            </Link>
          </div>

          <Link href="/" className="block px-4 py-2 rounded hover:bg-gray-800 transition mt-8 border-t border-gray-700 pt-4">
            ← Back to Store
          </Link>
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-800">
          <div className="text-xs text-gray-400 mb-2">
            <p className="font-semibold text-gray-200">{user?.displayName || 'Admin'}</p>
            <p className="text-gray-500 text-xs">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 text-xs bg-red-700 hover:bg-red-800 text-white rounded transition font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {children}
      </div>
    </div>
  );
}
