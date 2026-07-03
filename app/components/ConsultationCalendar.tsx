'use client';

import { useState } from 'react';

type TimeSlot = '10am' | '2pm' | '4pm';

const AVAILABLE_TIMES: TimeSlot[] = ['10am', '2pm', '4pm'];

export default function ConsultationCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<TimeSlot | ''>('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !email || !name) {
      alert('Please fill in all fields');
      return;
    }

    // TODO: Send to email service
    console.log({
      name,
      email,
      date: selectedDate,
      time: selectedTime,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setSelectedDate('');
      setSelectedTime('');
    }, 3000);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-playfair font-bold text-[#5A6B54] mb-2">
          Consultation Booked!
        </h3>
        <p className="text-gray-700 font-dmSans">
          Check your email for confirmation and Zoom link details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        className="w-full py-3 px-4 bg-[#B8995A] text-white font-playfair font-bold rounded-lg hover:bg-[#A0835A] transition"
      >
        Confirm Consultation
      </button>
    </form>
  );
}
