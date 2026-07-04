# Google OAuth 2.0 Setup Guide for AFUVAI Booking

## ✅ COMPLETED
- ✅ Google Cloud project created (afuvai-booking)
- ✅ OAuth consent screen configured
- ✅ OAuth 2.0 Client ID created
- ✅ Client ID: `207908055162-809f0ogctdtj7g4t44nt77af88dhfbl3.apps.googleusercontent.com`
- ✅ Frontend OAuth flow implemented
- ✅ API route created for token exchange

---

## 📋 REMAINING SETUP (You need to do these)

### 1. **Get Google OAuth Client Secret**

**In Google Cloud Console:**
1. Go to APIs & Services → Credentials
2. Find the OAuth 2.0 Client ID: `AFUVAI Booking Widget`
3. Click on it
4. Copy the **Client Secret** (blue button, shows `••••••••`)
5. Paste it here: `GOOGLE_OAUTH_CLIENT_SECRET=`

### 2. **Create Google Calendar for Bookings**

**Steps:**
1. Go to Google Calendar (calendar.google.com)
2. Create a new calendar:
   - Name: `AFUVAI Consultations`
   - Description: `Booking calendar for AFUVAI consultation scheduling`
3. Once created, find the Calendar ID (Settings → Calendar details)
   - Format looks like: `abc123@group.calendar.google.com`
4. Copy the Calendar ID: `GOOGLE_CALENDAR_ID=`

**Share with service account:**
1. In Google Calendar settings for this calendar, click "Share with others"
2. Add the service account email: `afuvai-booking-widget@afuvai-booking.iam.gserviceaccount.com`
3. Give it "Edit" permissions

### 3. **Set Netlify Environment Variables**

**In Netlify Dashboard:**
1. Go to Site Settings → Build & Deploy → Environment
2. Add these 3 variables:
   ```
   GOOGLE_OAUTH_CLIENT_SECRET = [paste from step 1]
   GOOGLE_CALENDAR_ID = [paste from step 2]
   MAILCHIMP_API_KEY = [existing key, or add if missing]
   NEXT_PUBLIC_SITE_URL = https://afuvai.com
   ```

3. **Redeploy site** (any commit to `main` will trigger rebuild with new env vars)

### 4. **Verify Redirect URIs are Correct**

**In Google Cloud Console:**
1. APIs & Services → Credentials
2. Click `AFUVAI Booking Widget` OAuth Client
3. Confirm these redirect URIs exist:
   - `http://localhost:3000/auth/callback` (dev)
   - `https://afuvai.com/auth/callback` (production)
   - `https://www.afuvai.com/auth/callback` (production with www)

---

## 🧪 Testing the Flow

### Local Testing (if running `npm run dev`):
1. Go to http://localhost:3000/consultation
2. Fill in name, email, phone, select date/time
3. Click "Confirm Consultation"
4. Should redirect to Google consent screen
5. Grant permissions
6. Should redirect back to http://localhost:3000/auth/callback
7. Should show success message
8. Check Google Calendar for the new event

### Production Testing:
1. Go to https://afuvai.com/consultation
2. Same flow as above
3. Should redirect to https://afuvai.com/auth/callback
4. Check Google Calendar for the new event
5. Check email (hello@afuvai.com should have confirmation)

---

## 📱 How It Works (User Experience)

1. **User visits /consultation page**
   - Fills in: Name, Email, Phone, Date, Time
   - Clicks "Confirm Consultation"

2. **OAuth Flow Initiates**
   - Booking data stored in session storage
   - Redirects to Google consent screen
   - User signs in to Google (or skips if already signed in)
   - User grants permission to "Create events on your calendar"

3. **Authorization Code Received**
   - Google redirects to `/auth/callback`
   - Auth code exchanged for access token
   - Calendar event created using the token
   - Confirmation email sent to user

4. **Success Page**
   - User sees confirmation message
   - Automatically redirects to /consultation?booked=true
   - Email arrives with event details

---

## 🔒 Security Notes

- ✅ OAuth Client ID is public (safe in frontend code)
- ✅ Client Secret stored ONLY in Netlify environment (never in code)
- ✅ Access tokens are ephemeral (valid for ~1 hour)
- ✅ Booking data validated on backend before creating event
- ✅ No personal data stored in browser beyond session storage
- ✅ Session storage cleared after booking completes

---

## 🐛 Troubleshooting

### "Authorization code is required"
- Check that OAuth flow actually completed (check browser redirect history)
- Verify session storage isn't cleared

### "Calendar event creation failed"
- Check GOOGLE_CALENDAR_ID env var is correct
- Verify service account has Edit permissions on calendar

### "Email send failed"
- MAILCHIMP_API_KEY might be missing or invalid
- Booking is still created, just no email sent
- Check logs for actual error

### User redirected to blank page after OAuth
- Check that `/auth/callback` page exists and is accessible
- Verify redirect URIs in Google Cloud match your domain

---

## 📚 Files Modified

- `app/components/ConsultationCalendar.tsx` — OAuth flow, form handling
- `app/auth/callback/page.tsx` — Authorization callback route
- `app/auth/callback/AuthCallbackClient.tsx` — Client component for OAuth handling
- `app/api/booking/exchange-code/route.ts` — Token exchange and event creation
- `.env.example` — Environment variable template

---

## ✅ When Setup is Complete

Once you've completed steps 1-4:

1. **Test locally**
2. **Commit any changes**
3. **Netlify redeploys automatically**
4. **Test on production (https://afuvai.com/consultation)**
5. **Booking flow is live!**

---

**Questions?** Check the code comments in:
- `app/components/ConsultationCalendar.tsx` — How OAuth is initiated
- `app/api/booking/exchange-code/route.ts` — How token is exchanged and event created
- `app/auth/callback/AuthCallbackClient.tsx` — How callback is handled
