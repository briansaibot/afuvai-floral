export type Tier = 'whale' | 'vip' | 'standard' | 'untiered';
export type DeliveryMethod = 'photo' | 'signature';
export type OrderStatus = 'pending' | 'completed' | 'failed';

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  tier: Tier;
  lifetime_value: number;
  last_purchase_date?: string;
  inactivity_flag_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  allow_auto_reorder: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  stripe_payment_intent_id?: string;
  customer_id: string;
  total_amount: number;
  delivery_fee: number;
  tax: number;
  delivery_method: DeliveryMethod;
  signature_required: boolean;
  status: OrderStatus;
  auto_marked_complete: boolean;
  delivery_address?: string;
  delivery_date?: string;
  delivery_time_slot?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  created_at: string;
}

export interface CustomerTier {
  id: string;
  customer_id: string;
  product_id: string;
  tier: Tier;
  lifetime_spend_on_stem: number;
  created_at: string;
  updated_at: string;
}

export interface AutoReorderItem {
  id: string;
  product_id: string;
  approved_by_admin: boolean;
  created_at: string;
  updated_at: string;
}
