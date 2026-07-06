'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { validatePin, createSession } from '@/lib/rbac';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPinHint, setShowPinHint] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate auth delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!username || !pin) {
      setError('Please enter username and PIN');
      setLoading(false);
      return;
    }

    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      setLoading(false);
      return;
    }

    // Validate against hardcoded admins
    const admin = validatePin(username, pin);

    if (!admin) {
      setError('Invalid username or PIN');
      setPin('');
      setLoading(false);
      return;
    }

    // Create session and store in localStorage + send to API to set cookie
    const session = createSession(admin);
    localStorage.setItem('adminSession', JSON.stringify(session));
    localStorage.setItem('adminUser', JSON.stringify({
      id: admin.id,
      username: admin.username,
      displayName: admin.displayName,
      role: admin.role,
    }));

    // Also set httpOnly cookie via API route
    try {
      await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session }),
      });
    } catch (e) {
      console.error('Failed to set session cookie:', e);
    }

    // Redirect to dashboard
    router.push('/admin');
  };

  const handleQuickLogin = (u: string, p: string) => {
    setUsername(u);
    setPin(p);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AFUVAI</h1>
          <p className="text-gray-400 text-sm tracking-widest">ADMIN PORTAL v2</p>
          <div className="w-12 h-px bg-amber-600 mx-auto mt-4"></div>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-6">Admin Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 transition"
              />
              <p className="text-xs text-gray-500 mt-1">Admin: AmiDayne or Brian</p>
            </div>

            {/* PIN Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                PIN (4 digits)
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setPin(val);
                }}
                placeholder="••••"
                maxLength={4}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 transition text-2xl tracking-widest text-center"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('AmiDayne', '0599')}
                  className="flex-1 px-3 py-1 text-xs bg-gray-700 hover:bg-amber-700 text-white rounded transition"
                >
                  Quick: Ami
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('Brian', '5503')}
                  className="flex-1 px-3 py-1 text-xs bg-gray-700 hover:bg-amber-700 text-white rounded transition"
                >
                  Quick: Brian
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-900 border border-red-700 rounded text-red-100 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 text-white font-medium rounded transition"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials Box */}
          <div className="mt-6 p-4 bg-amber-900/20 rounded border border-amber-700/30">
            <p className="text-xs font-semibold text-amber-200 mb-2">📋 Demo Credentials:</p>
            <div className="space-y-1 text-xs text-amber-100 font-mono">
              <p><strong>Username:</strong> AmiDayne | <strong>PIN:</strong> 0599</p>
              <p><strong>Username:</strong> Brian | <strong>PIN:</strong> 5503</p>
            </div>
            <p className="text-xs text-gray-400 mt-3">👆 Or click "Quick" buttons above to auto-fill.</p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-gray-400 hover:text-white text-sm transition">
            ← Back to Site
          </Link>
        </div>
      </div>
    </div>
  );
}
