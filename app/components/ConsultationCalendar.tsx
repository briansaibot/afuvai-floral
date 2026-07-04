'use client';

import { useState } from 'react';
import { BORDER, CARD, GOLD, INK, IVORY, MUTED, SAGE, serif } from '@/lib/constants';

type TimeSlot = '10am' | '2pm' | '4pm';

const AVAILABLE_TIMES: TimeSlot[] = ['10am', '2pm', '4pm'];
const GOOGLE_OAUTH_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;

export default function ConsultationCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<TimeSlot | ''>('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Generate next 14 days, excluding Sundays
  const generateAvailableDates = () => {
    const dates: string[] = [];
    const today = new Date();

    for (let i = 0; i < 21; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip Sundays
      if (date.getDay() === 0) continue;

      const dateStr = date.toISOString().split('T')[0];
      dates.push(dateStr);

      if (dates.length >= 14) break;
    }

    return dates;
  };

  const availableDates = generateAvailableDates();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedDate || !selectedTime || !email || !name || !phone) {
      setError('Please fill in all fields');
      return;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    // Validate phone (basic check)
    if (!/^[\d\s\-\+\(\)]+$/.test(phone) || phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    // Build Google OAuth flow parameters
    const timeHour = selectedTime === '10am' ? '10' : selectedTime === '2pm' ? '14' : '16';
    const dateTime = `${selectedDate}T${timeHour}:00:00`;

    // Store booking data in session storage so we can send it after OAuth
    sessionStorage.setItem(
      'pendingBooking',
      JSON.stringify({
        name,
        email,
        phone,
        dateTime,
      })
    );

    // Initiate OAuth flow
    const oauthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    oauthUrl.searchParams.append('client_id', GOOGLE_OAUTH_CLIENT_ID!);
    oauthUrl.searchParams.append('redirect_uri', `${window.location.origin}/auth/callback`);
    oauthUrl.searchParams.append('response_type', 'code');
    oauthUrl.searchParams.append('scope', 'https://www.googleapis.com/auth/calendar.events');
    oauthUrl.searchParams.append('access_type', 'offline');
    oauthUrl.searchParams.append('prompt', 'consent');

    setSubmitting(true);
    window.location.href = oauthUrl.toString();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error message */}
      {error && (
        <div
          style={{
            padding: '1rem',
            background: '#fee',
            border: `1px solid #fcc`,
            borderRadius: '4px',
            color: '#c33',
            fontSize: '0.9rem',
          }}
        >
          {error}
        </div>
      )}

      {/* Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A6B54]"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A6B54]"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A6B54]"
          required
        />
      </div>

      {/* Date Selection */}
      <div>
        <label className="block text-sm font-dmSans font-semibold text-gray-700 mb-3">
          Select a Date
        </label>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
          {availableDates.map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => setSelectedDate(date)}
              className={`py-2 px-1 text-xs font-dmSans rounded-lg border transition ${
                selectedDate === date
                  ? 'bg-[#5A6B54] text-white border-[#5A6B54]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#5A6B54]'
              }`}
            >
              {formatDate(date).split(' ')[1]}
              <br />
              <span className="text-[10px]">{formatDate(date).split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div>
        <label className="block text-sm font-dmSans font-semibold text-gray-700 mb-3">
          Select a Time
        </label>
        <div className="grid grid-cols-3 gap-3">
          {AVAILABLE_TIMES.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setSelectedTime(time)}
              className={`py-3 px-4 rounded-lg border transition font-dmSans ${
                selectedTime === time
                  ? 'bg-[#5A6B54] text-white border-[#5A6B54]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#5A6B54]'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 px-4 bg-[#B8995A] text-white font-playfair font-bold rounded-lg hover:bg-[#A0835A] transition disabled:opacity-50"
      >
        {submitting ? 'Redirecting...' : 'Confirm Consultation'}
      </button>

      <p style={{ fontSize: '0.8rem', color: MUTED, textAlign: 'center' }}>
        You'll be asked to authorize calendar access. We only create events on your behalf.
      </p>
    </form>
  );
}
