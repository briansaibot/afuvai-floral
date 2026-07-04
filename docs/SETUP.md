# AFUVAI Floral — Database & Order System Setup

## Phase 3: Core Infrastructure

### What We Built
- **Supabase Schema** — 6 tables: customers, products, orders, order_items, customer_tiers, auto_reorder_items
- **Auto-Complete Trigger** — Orders with photo/signature delivery auto-mark complete
- **Admin Dashboard** — `/admin/orders` and `/admin/products` with mobile-first UI
- **API Routes** — Stripe webhook, orders API, products API
- **TypeScript Types** — Full type safety for all database models

---

## Setup Steps

### 1. Supabase Project Setup

1. Go to https://supabase.com and create a new project
2. Save your credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY` (keep secret!)

3. Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

### 2. Create Database Schema

1. Go to Supabase Dashboard → SQL Editor
2. Copy the entire contents of `docs/database-schema.sql`
3. Paste and run
4. Verify all tables created:
   - customers
   - products
   - orders
   - order_items
   - customer_tiers
   - auto_reorder_items

### 3. Set Up Stripe Webhook

1. Go to Stripe Dashboard → Webhooks
2. Create endpoint pointing to: `https://yourdomain.com/api/webhooks/stripe`
3. Listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy webhook signing secret → `STRIPE_WEBHOOK_SECRET` in `.env.local`

### 4. Install Dependencies

```bash
npm install @supabase/supabase-js stripe
```

### 5. Deploy

```bash
git add .
git commit -m "feat: add order system with auto-complete triggers"
git push origin main
```

Vercel auto-deploys. Access:
- **Orders Dashboard:** https://afuvai.com/admin/orders
- **Products Dashboard:** https://afuvai.com/admin/products

---

## How It Works

### Order Flow
1. Customer buys on site (Stripe checkout)
2. Payment succeeds → Stripe sends webhook
3. `/api/webhooks/stripe` receives payment
4. **Trigger fires:** Order inserted with `delivery_method = 'photo'` or `'signature'`
5. PostgreSQL trigger auto-sets `status = 'completed'` + `auto_marked_complete = true`
6. Customer tier auto-calculated (whale/vip/standard based on LTV)
7. Order appears in `/admin/orders` dashboard marked complete ✓

### Auto-Reorder Rules
- Toggle `allow_auto_reorder` in `/admin/products` (ON/OFF button)
- Only customers in eligible tiers can auto-reorder approved items
- Executed at 9am daily (n8n workflow, configured separately)

### Tier Assignment
- **Whale:** $10,000+ lifetime value
- **VIP:** $5,000+ lifetime value
- **Standard:** <$5,000
- Auto-recalculated after each order
- Tracked **per stem** (product type)

---

## Admin Dashboards

### `/admin/orders`
- **View all orders** with customer, amount, delivery method, status
- **Filter by:** Status (Completed/Pending), Tier (Whale/VIP/Standard)
- **See auto-complete status** — checkmark if auto-marked
- **Mobile-responsive** — optimized for iPad/phone use

### `/admin/products`
- **List all products** with price, auto-reorder status, created date
- **Toggle auto-reorder** — click ON/OFF button
- Products approved for auto-reorder can be added to recurring orders

---

## Database Triggers

### `order_auto_complete_trigger`
- Fires **BEFORE** order insert
- Checks: if `delivery_method` is 'photo' OR 'signature'
- Sets `status = 'completed'` and `auto_marked_complete = true`
- **No manual steps needed** — automatic

### `order_update_tier_trigger`
- Fires **AFTER** order insert
- Recalculates customer's `lifetime_value` (sum of all completed orders)
- Auto-assigns tier: whale (≥$10k), vip (≥$5k), or standard
- Updates `last_purchase_date` and `inactivity_flag_date` (6 months)

---

## Environment Variables

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Public key for client-side
- `SUPABASE_SERVICE_KEY` — Secret key for API routes
- `STRIPE_SECRET_KEY` — Stripe secret
- `STRIPE_WEBHOOK_SECRET` — Webhook signing secret

**Optional:**
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — For checkout (Phase 3 continued)

---

## Next Steps

### Phase 3 Continued
- [ ] Wire Stripe Checkout button (frontend integration)
- [ ] Test webhook with Stripe test mode
- [ ] Verify order creation → auto-complete flow

### Phase 4
- [ ] Set up n8n workflow for 9am auto-reorder execution
- [ ] Add photo/signature delivery tracking
- [ ] Email confirmation templates

### Phase 5
- [ ] Customer dashboard (view tier, orders, auto-reorder status)
- [ ] Social research integration for Whale/VIP tiers
- [ ] Mobile app or PWA wrapper

---

## Troubleshooting

### Orders not appearing?
1. Check Stripe webhook is firing (Stripe Dashboard → Events)
2. Verify webhook URL is publicly accessible
3. Check `.env.local` has correct `STRIPE_WEBHOOK_SECRET`
4. Look at Supabase logs for trigger errors

### Tier not updating?
1. Verify `order_update_tier_trigger` exists in database
2. Check that order `status = 'completed'` (only completed orders count for LTV)
3. Run manual update in Supabase SQL Editor:
   ```sql
   SELECT update_customer_tier();
   ```

### Admin dashboard loading slow?
1. Add pagination to `/api/admin/orders` for large datasets
2. Create indexes (already in schema)
3. Consider caching with Redis for high traffic

---

## Security Notes

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Service key only used in API routes (never expose in frontend)
- ✅ Webhook signature verified with `STRIPE_WEBHOOK_SECRET`
- ⚠️ Rate limit `/api/webhooks/stripe` if needed (high volume)

---

**Scaffolding Complete.** Ready to wire checkout and test!
