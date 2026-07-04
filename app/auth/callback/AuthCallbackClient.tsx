'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IVORY, INK, MUTED, serif } from '@/lib/constants';

export function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          setStatus('error');
          setMessage(`Authorization failed: ${error}`);
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('No authorization code received.');
          return;
        }

        // Get pending booking data from session storage
        const pendingBooking = JSON.parse(sessionStorage.getItem('pendingBooking') || '{}');

        if (!pendingBooking.name || !pendingBooking.email) {
          setStatus('error');
          setMessage('Session expired. Please try booking again.');
          return;
        }

        // Exchange code for token + create calendar event
        const response = await fetch('/api/booking/exchange-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            ...pendingBooking,
          }),
        });

        // Clear session storage
        sessionStorage.removeItem('pendingBooking');

        const data = await response.json();

        if (!response.ok) {
          setStatus('error');
          setMessage(data.error || 'Failed to complete booking.');
          return;
        }

        setStatus('success');
        setMessage('Consultation booked! Check your email for confirmation.');

        // Redirect to consultation page after 3 seconds
        setTimeout(() => {
          router.push('/consultation?booked=true');
        }, 3000);
      } catch (err) {
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div style={{ background: IVORY, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '500px', textAlign: 'center', padding: '2rem' }}>
        {status === 'loading' && (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <h1 style={{ fontFamily: serif, fontSize: '1.8rem', color: INK, marginBottom: '0.5rem' }}>
              Completing your booking...
            </h1>
            <p style={{ color: MUTED, fontSize: '0.95rem' }}>Please wait while we finalize your consultation appointment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
            <h1 style={{ fontFamily: serif, fontSize: '1.8rem', color: INK, marginBottom: '0.5rem' }}>
              Booking confirmed!
            </h1>
            <p style={{ color: MUTED, fontSize: '0.95rem', marginBottom: '1.5rem' }}>{message}</p>
            <p style={{ color: MUTED, fontSize: '0.85rem' }}>Redirecting in 3 seconds...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✕</div>
            <h1 style={{ fontFamily: serif, fontSize: '1.8rem', color: INK, marginBottom: '0.5rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: MUTED, fontSize: '0.95rem', marginBottom: '1.5rem' }}>{message}</p>
            <a
              href="/consultation"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: INK,
                color: IVORY,
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '0.9rem',
                fontWeight: '600',
              }}
            >
              Back to Booking
            </a>
          </>
        )}
      </div>
    </div>
  );
}
