# Google OAuth 2.0 Setup Guide for AFUVAI Booking

## ✅ COMPLETED
- ✅ Google Cloud project created (afuvai-booking)
- ✅ OAuth 2.0 Client ID created (v2)
- ✅ Client ID: `207908055162-1rtrsp8i94nndf5jlp2p1no7hdrrhiq.apps.googleusercontent.com`
- ✅ Client Secret: You have it (from the popup)
- ✅ Frontend OAuth flow implemented
- ✅ API route created for token exchange
- ✅ Redirect URIs configured correctly

---

## 📋 REMAINING SETUP (What You Do Next)

### 1. **Client Secret** ✅ DONE
You already have this from the Google Cloud popup:
- **Save this safely:** The long string starting with `GOCSPX-...`
- You'll paste it into Netlify in step 3

### 2. **Create Google Calendar for Bookings** (5 min)

**Go to Google Calendar (calendar.google.com):**

1. On the left sidebar, click **"+ Create"** (or the **+** button)
2. Select **"Create new calendar"**
3. Fill in:
   - Name: `AFUVAI Consultations`
   - Description: `Booking calendar for consultation scheduling`
   - Leave timezone as-is
4. Click **"Create calendar"**
5. The calendar will appear in your list

**Now get the Calendar ID:**
1. On the left, right-click on `AFUVAI Consultations`
2. Select **"Settings"**
3. Scroll down to **"Integrate calendar"** section
4. You'll see: **Calendar ID** (looks like: `abc123@group.calendar.google.com`)
5. **Copy this Calendar ID** and save it

**Share with service account (so AFUVAI can create events):**
1. In Settings, scroll to **"Share with others"**
2. Click **"Add people and groups"**
3. Paste: `afuvai-booking-widget@afuvai-booking.iam.gserviceaccount.com`
4. Give it **"Edit"** permissions
5. Click **"Share"**

### 3. **Set Netlify Environment Variables** (3 min)

**In Netlify Dashboard:**
1. Go to your site
2. Site Settings (top menu)
3. Build & Deploy → **Environment**
4. Click **"Edit variables"**
5. Add these 4 variables (one per line):

```
GOOGLE_OAUTH_CLIENT_SECRET = [paste the long secret from Google popup]
GOOGLE_CALENDAR_ID = [paste from Google Calendar settings]
MAILCHIMP_API_KEY = [your existing key, or skip if you don't have it]
NEXT_PUBLIC_SITE_URL = https://afuvai.com
```

6. Click **"Save"**
7. **Redeploy** (go to Deploys → Trigger deploy → Deploy site)

### 4. **Verify Everything** ✅ Already Done
Redirect URIs are already correct:
- ✅ http://localhost:3000/auth/callback
- ✅ https://afuvai.com/auth/callback
- ✅ https://www.afuvai.com/auth/callback

---

## 🧪 Testing the Flow

### Local Testing (if running `npm run dev`):
1. Go to http://localhost:3000/consultation
2. Fill in name, email, phone, select date/time
3. Click "Confirm Consultation"
4. Should redirect to Google consent screen
5. Grant permissions to "Create events on your calendar"
6. Should redirect back to http://localhost:3000/auth/callback
7. Should show success message
8. Check Google Calendar (`AFUVAI Consultations`) for the new event

### Production Testing (after Netlify deploys):
1. Go to https://afuvai.com/consultation
2. Same flow as above
3. Should redirect to https://afuvai.com/auth/callback
4. Check Google Calendar for the new event
5. Check email (confirmation sent to the email you entered)

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
- ✅ Access tokens are ephemeral (~1 hour)
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
- Check calendar exists and is accessible

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
- `docs/OAUTH_SETUP.md` — This file

---

## ✅ Quick Checklist

- [ ] 1. Client Secret saved (you have it)
- [ ] 2. Google Calendar created (`AFUVAI Consultations`)
- [ ] 3. Calendar ID copied from Calendar settings
- [ ] 4. Service account shared with calendar (Edit permission)
- [ ] 5. Netlify env vars set (4 variables)
- [ ] 6. Netlify site redeployed
- [ ] 7. Test on https://afuvai.com/consultation
- [ ] 8. Verify event appears in Google Calendar
- [ ] 9. Check email for confirmation

---

**Once all steps are complete, the booking flow is LIVE!** 🎉
