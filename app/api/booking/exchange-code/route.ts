import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://afuvai.com';

// Helper: Exchange authorization code for access token
async function exchangeCodeForToken(code: string) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_OAUTH_CLIENT_ID!,
      client_secret: GOOGLE_OAUTH_CLIENT_SECRET!,
      redirect_uri: `${SITE_URL}/auth/callback`,
      grant_type: 'authorization_code',
    }).toString(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Token exchange failed: ${error.error_description || error.error}`);
  }

  return response.json();
}

// Helper: Create calendar event
async function createCalendarEvent(accessToken: string, eventData: any) {
  const event = {
    summary: `AFUVAI Consultation - ${eventData.name}`,
    description: `Consultation booking\n\nGuest: ${eventData.name}\nEmail: ${eventData.email}\nPhone: ${eventData.phone}`,
    start: {
      dateTime: new Date(eventData.dateTime).toISOString(),
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: new Date(new Date(eventData.dateTime).getTime() + 30 * 60000).toISOString(),
      timeZone: 'America/Los_Angeles',
    },
    attendees: [
      { email: eventData.email, displayName: eventData.name, responseStatus: 'needsAction' },
      { email: 'hello@afuvai.com', displayName: 'AFUVAI Consultation', responseStatus: 'accepted' },
    ],
  };

  const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Calendar event creation failed: ${error.error.message}`);
  }

  return response.json();
}

// Helper: Send confirmation email via Mailchimp
async function sendConfirmationEmail(name: string, email: string, dateTime: string) {
  const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
  if (!mailchimpApiKey) {
    console.warn('Mailchimp API key not configured, skipping email');
    return null;
  }

  const date = new Date(dateTime);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  // Using Mailchimp Mandrill transactional email
  const response = await fetch('https://mandrillapp.com/api/1.0/messages/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      key: mailchimpApiKey,
      message: {
        to: [{ email, name }],
        from_email: 'hello@afuvai.com',
        from_name: 'AFUVAI Consultation',
        subject: 'Your AFUVAI Consultation is Confirmed',
        html: `
          <h2>Consultation Confirmed</h2>
          <p>Hi ${name},</p>
          <p>Your free 30-minute consultation with AmiDayne is booked for:</p>
          <p><strong>${formattedDate} at ${formattedTime} PST</strong></p>
          <p>You'll receive a Zoom link 24 hours before your consultation.</p>
          <p>Questions? Reply to this email or contact <a href="mailto:hello@afuvai.com">hello@afuvai.com</a></p>
          <p>— AFUVAI Floral Society</p>
        `,
      },
    }),
  });

  if (!response.ok) {
    console.error('Email send failed, but booking was created');
  }

  return response;
}

export async function POST(request: NextRequest) {
  try {
    const { code, name, email, phone, dateTime } = await request.json();

    if (!code || !name || !email || !dateTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Step 1: Exchange code for token
    const tokenData = await exchangeCodeForToken(code);

    // Step 2: Create calendar event
    const calendarEvent = await createCalendarEvent(tokenData.access_token, {
      name,
      email,
      phone,
      dateTime,
    });

    // Step 3: Send confirmation email (non-blocking)
    sendConfirmationEmail(name, email, dateTime).catch((err) => {
      console.error('Error sending confirmation email:', err);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Consultation booked successfully',
        eventId: calendarEvent.id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to complete booking' },
      { status: 500 }
    );
  }
}
