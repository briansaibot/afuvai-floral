import { Suspense } from 'react';
import { AuthCallbackClient } from './AuthCallbackClient';
import { IVORY, INK } from '@/lib/constants';

export const metadata = {
  title: 'Booking Confirmation | AFUVAI',
  robots: 'noindex',
};

function LoadingFallback() {
  return (
    <div style={{ background: IVORY, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <p style={{ color: INK }}>Loading...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthCallbackClient />
    </Suspense>
  );
}
