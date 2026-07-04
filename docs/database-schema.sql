-- AFUVAI Floral — Supabase Schema
-- Created: July 4, 2026
-- Auto-mark complete on order creation (photo or signature delivery)

-- 1. CUSTOMERS TABLE
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  
  -- Tier classification
  tier VARCHAR(50) DEFAULT 'untiered', -- whale, vip, standard, untiered
  lifetime_value NUMERIC(10, 2) DEFAULT 0,
  
  -- Inactivity tracking
  last_purchase_date TIMESTAMP,
  inactivity_flag_date TIMESTAMP, -- flagged at 6 months no purchase
  
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 2. PRODUCTS TABLE
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  
  -- Auto-reorder control
  allow_auto_reorder BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 3. ORDERS TABLE
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_payment_intent_id VARCHAR(255) UNIQUE,
  customer_id UUID NOT NULL REFERENCES customers(id),
  
  -- Order details
  total_amount NUMERIC(10, 2) NOT NULL,
  delivery_fee NUMERIC(10, 2) DEFAULT 5.00,
  tax NUMERIC(10, 2),
  
  -- Delivery method
  delivery_method VARCHAR(50) NOT NULL, -- 'photo', 'signature'
  signature_required BOOLEAN DEFAULT false,
  
  -- Order status
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed
  auto_marked_complete BOOLEAN DEFAULT false,
  
  -- Address
  delivery_address TEXT,
  delivery_date DATE,
  delivery_time_slot VARCHAR(50), -- '9am', '2pm', '4pm'
  
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 4. ORDER_ITEMS TABLE
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  price_at_purchase NUMERIC(10, 2) NOT NULL,
  
  created_at TIMESTAMP DEFAULT now()
);

-- 5. CUSTOMER_TIERS TABLE (per stem tracking)
CREATE TABLE customer_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  product_id UUID NOT NULL REFERENCES products(id),
  
  -- Tier specific to this stem/product
  tier VARCHAR(50) DEFAULT 'standard', -- whale, vip, standard
  lifetime_spend_on_stem NUMERIC(10, 2) DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  
  UNIQUE(customer_id, product_id)
);

-- 6. AUTO_REORDER_ITEMS TABLE
CREATE TABLE auto_reorder_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  
  -- Approved by Brian for auto-reorder
  approved_by_admin BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- TRIGGER: Auto-mark orders complete
-- Fires on order insert: if delivery_method is 'photo' OR 'signature', mark status = 'completed'
CREATE OR REPLACE FUNCTION auto_mark_order_complete()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.delivery_method IN ('photo', 'signature') THEN
    NEW.status := 'completed';
    NEW.auto_marked_complete := true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER order_auto_complete_trigger
BEFORE INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION auto_mark_order_complete();

-- FUNCTION: Update customer tier based on lifetime spend
-- Call after each order to recalculate tier
CREATE OR REPLACE FUNCTION update_customer_tier()
RETURNS TRIGGER AS $$
DECLARE
  new_lifetime_value NUMERIC;
BEGIN
  -- Recalculate customer's lifetime value
  SELECT COALESCE(SUM(total_amount), 0) INTO new_lifetime_value
  FROM orders
  WHERE customer_id = NEW.customer_id AND status = 'completed';
  
  -- Update customer tier
  UPDATE customers
  SET lifetime_value = new_lifetime_value,
      tier = CASE 
        WHEN new_lifetime_value >= 10000 THEN 'whale'
        WHEN new_lifetime_value >= 5000 THEN 'vip'
        ELSE 'standard'
      END,
      last_purchase_date = now(),
      updated_at = now()
  WHERE id = NEW.customer_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER order_update_tier_trigger
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION update_customer_tier();

-- INDEXES for performance
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_delivery_method ON orders(delivery_method);
CREATE INDEX idx_customers_tier ON customers(tier);
CREATE INDEX idx_customer_tiers_customer ON customer_tiers(customer_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Enable RLS (Row Level Security)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE auto_reorder_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies (admin-only access for now)
CREATE POLICY "Enable read for admin" ON customers FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated" ON orders FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable read for authenticated" ON orders FOR SELECT USING (auth.role() = 'authenticated');
