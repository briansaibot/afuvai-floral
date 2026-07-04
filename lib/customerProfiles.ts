// Extended customer 360 profiles with full history, preferences, lifecycle
export interface CustomerProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  tier: 'whale' | 'vip' | 'standard' | 'untiered';
  lifetimeValue: number;
  createdAt: string;
  
  // Purchase History
  totalOrders: number;
  totalSpent: number;
  lastPurchase: string;
  firstPurchase: string;
  
  // Engagement
  repeatRate: number; // % of repeat purchases
  daysInactive: number;
  churnRisk: number; // 0-100, higher = more likely to churn
  engagementScore: number; // 0-100
  
  // Preferences
  favoriteFlowers: string[];
  preferredOccasions: string[];
  pricePointPreference: 'budget' | 'mid' | 'luxury';
  deliveryPreference: 'photo' | 'signature' | 'either';
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    push: boolean;
  };
  
  // Special Status
  isAutoReorderActive: boolean;
  autoReorderProducts: string[];
  referrals: number;
  referralValue: number;
  anniversaryDates: string[];
  notes: string;
  
  // RFM Scores
  rfmRecency: number; // 1-5 (1=just bought, 5=over 6mo)
  rfmFrequency: number; // 1-5 orders per year
  rfmMonetary: number; // 1-5 spend per order
  
  // Cohort
  cohort: string; // "Jan 2026", "Feb 2025", etc
  cohortRetention: number; // % of cohort still active
  
  // Prediction
  predictedChurnDate?: string;
  winbackEligible: boolean;
  upsellOpportunity?: string;
  
  // History
  journeyLog: JourneyEvent[];
}

export interface JourneyEvent {
  type: 'purchase' | 'email_sent' | 'email_opened' | 'sms_sent' | 'delivery' | 'feedback' | 'tier_upgrade' | 'abandoned_cart' | 'product_view' | 'referral_sent';
  timestamp: string;
  description: string;
  value?: number;
  product?: string;
}

export interface PriceOptimization {
  productId: string;
  productName: string;
  currentPrice: number;
  recommendedPrice: number;
  priceChange: number;
  reason: string; // "high demand", "low margin", "competitive pressure"
  estimatedImpact: string; // "+5% revenue" or "-2% volume"
}

export interface EmailCampaign {
  id: string;
  name: string;
  segment: string; // "Whale tier inactive 3mo+", "Standard, loves roses"
  subject: string;
  body: string;
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  status: 'draft' | 'scheduled' | 'sent' | 'paused';
  scheduledFor?: string;
}

export interface IntegrationStatus {
  name: string;
  status: 'connected' | 'disconnected' | 'error' | 'needs_setup';
  lastSync?: string;
  url?: string;
  apiKey?: string;
  setupUrl?: string;
}

// Mock Customer 360 Profiles
export const customerProfiles: CustomerProfile[] = [
  {
    id: 'cust-1',
    email: 'wendy@example.com',
    name: 'Wendy N.',
    phone: '702-555-0101',
    tier: 'whale',
    lifetimeValue: 12500,
    createdAt: '2025-06-15T08:00:00Z',
    totalOrders: 28,
    totalSpent: 12500,
    lastPurchase: '2026-07-02T10:30:00Z',
    firstPurchase: '2025-06-15T08:00:00Z',
    repeatRate: 0.92,
    daysInactive: 2,
    churnRisk: 5, // Very low
    engagementScore: 95,
    favoriteFlowers: ['roses', 'peonies', 'orchids'],
    preferredOccasions: ['anniversary', 'special events', 'just because'],
    pricePointPreference: 'luxury',
    deliveryPreference: 'signature',
    communicationPreferences: { email: true, sms: true, whatsapp: true, push: true },
    isAutoReorderActive: true,
    autoReorderProducts: ['1', '6'],
    referrals: 3,
    referralValue: 2400,
    anniversaryDates: ['2026-09-14', '2027-02-20'],
    notes: 'VIP customer - prefers white glove service. Host regular events.',
    rfmRecency: 1,
    rfmFrequency: 5,
    rfmMonetary: 5,
    cohort: 'Jun 2025',
    cohortRetention: 0.78,
    winbackEligible: false,
    upsellOpportunity: 'wedding service package',
    journeyLog: [
      { type: 'purchase', timestamp: '2026-07-02T10:30:00Z', description: 'Ordered Ivory Reverie', value: 395.50, product: '6' },
      { type: 'delivery', timestamp: '2026-07-02T15:30:00Z', description: 'Signature delivery completed' },
      { type: 'feedback', timestamp: '2026-07-03T08:00:00Z', description: '5-star review left' },
      { type: 'email_sent', timestamp: '2026-07-03T09:00:00Z', description: 'VIP exclusive offer sent' },
      { type: 'email_opened', timestamp: '2026-07-03T10:15:00Z', description: 'VIP offer email opened' },
      { type: 'purchase', timestamp: '2026-06-28T14:00:00Z', description: 'Ordered The Afuvai Purse', value: 245.75, product: '1' },
    ],
  },
  {
    id: 'cust-2',
    email: 'michele@example.com',
    name: 'Michele A.',
    phone: '702-555-0102',
    tier: 'vip',
    lifetimeValue: 8750,
    createdAt: '2025-08-20T10:00:00Z',
    totalOrders: 18,
    totalSpent: 8750,
    lastPurchase: '2026-06-28T14:15:00Z',
    firstPurchase: '2025-08-20T10:00:00Z',
    repeatRate: 0.68,
    daysInactive: 6,
    churnRisk: 35,
    engagementScore: 72,
    favoriteFlowers: ['sunflowers', 'daisies', 'lilies'],
    preferredOccasions: ['birthdays', 'get well soon'],
    pricePointPreference: 'mid',
    deliveryPreference: 'photo',
    communicationPreferences: { email: true, sms: false, whatsapp: true, push: false },
    isAutoReorderActive: false,
    autoReorderProducts: [],
    referrals: 1,
    referralValue: 385,
    anniversaryDates: ['2026-10-15'],
    notes: 'Engaged with seasonal campaigns. Birthday coming up 10/15 - auto-trigger reminder.',
    rfmRecency: 3,
    rfmFrequency: 3,
    rfmMonetary: 3,
    cohort: 'Aug 2025',
    cohortRetention: 0.72,
    winbackEligible: false,
    upsellOpportunity: 'subscription (birthday + anniversary)',
    journeyLog: [
      { type: 'purchase', timestamp: '2026-06-28T14:15:00Z', description: 'Ordered Garden Bliss', value: 328.50, product: '2' },
      { type: 'delivery', timestamp: '2026-06-28T17:00:00Z', description: 'Photo delivery completed' },
      { type: 'email_sent', timestamp: '2026-06-20T09:00:00Z', description: 'Summer flowers campaign' },
      { type: 'email_opened', timestamp: '2026-06-20T11:30:00Z', description: 'Campaign email opened' },
      { type: 'product_view', timestamp: '2026-06-25T18:00:00Z', description: 'Viewed Lavender Dreams' },
    ],
  },
  {
    id: 'cust-3',
    email: 'myke@example.com',
    name: 'Myke N.',
    phone: '702-555-0103',
    tier: 'vip',
    lifetimeValue: 5200,
    createdAt: '2025-10-10T12:00:00Z',
    totalOrders: 9,
    totalSpent: 5200,
    lastPurchase: '2026-07-01T16:45:00Z',
    firstPurchase: '2025-10-10T12:00:00Z',
    repeatRate: 0.55,
    daysInactive: 3,
    churnRisk: 28,
    engagementScore: 68,
    favoriteFlowers: ['tulips', 'hydrangeas'],
    preferredOccasions: ['holidays', 'thank you'],
    pricePointPreference: 'mid',
    deliveryPreference: 'either',
    communicationPreferences: { email: true, sms: true, whatsapp: false, push: true },
    isAutoReorderActive: false,
    autoReorderProducts: [],
    referrals: 0,
    referralValue: 0,
    anniversaryDates: [],
    notes: 'Recent customer, strong engagement with emails. Good upsell candidate.',
    rfmRecency: 2,
    rfmFrequency: 2,
    rfmMonetary: 2,
    cohort: 'Oct 2025',
    cohortRetention: 0.65,
    winbackEligible: false,
    upsellOpportunity: 'auto-reorder subscription',
    journeyLog: [
      { type: 'purchase', timestamp: '2026-07-01T16:45:00Z', description: 'Ordered Lavender Dreams', value: 195.25, product: '3' },
      { type: 'delivery', timestamp: '2026-07-01T19:00:00Z', description: 'Photo delivery completed' },
      { type: 'purchase', timestamp: '2026-06-15T10:00:00Z', description: 'Ordered Paradise Box', value: 105, product: '5' },
    ],
  },
  {
    id: 'cust-4',
    email: 'jordan@example.com',
    name: 'Jordan T.',
    phone: '702-555-0104',
    tier: 'standard',
    lifetimeValue: 845,
    createdAt: '2026-01-05T11:30:00Z',
    totalOrders: 3,
    totalSpent: 845,
    lastPurchase: '2026-06-15T09:20:00Z',
    firstPurchase: '2026-01-05T11:30:00Z',
    repeatRate: 0.33,
    daysInactive: 19,
    churnRisk: 72,
    engagementScore: 35,
    favoriteFlowers: ['gerberas'],
    preferredOccasions: ['graduation'],
    pricePointPreference: 'budget',
    deliveryPreference: 'photo',
    communicationPreferences: { email: true, sms: false, whatsapp: false, push: false },
    isAutoReorderActive: false,
    autoReorderProducts: [],
    referrals: 0,
    referralValue: 0,
    anniversaryDates: [],
    notes: 'AT RISK: 19 days inactive. Winback eligible. Send targeted discount + engagement email.',
    rfmRecency: 5,
    rfmFrequency: 1,
    rfmMonetary: 1,
    cohort: 'Jan 2026',
    cohortRetention: 0.55,
    winbackEligible: true,
    upsellOpportunity: 'none - focus on retention',
    predictedChurnDate: '2026-07-15',
    journeyLog: [
      { type: 'purchase', timestamp: '2026-06-15T09:20:00Z', description: 'Ordered Primary Burst', value: 118.50, product: '4' },
      { type: 'delivery', timestamp: '2026-06-15T12:00:00Z', description: 'Photo delivery completed' },
      { type: 'purchase', timestamp: '2026-04-10T14:00:00Z', description: 'Ordered Paradise Box', value: 236.25, product: '5' },
      { type: 'purchase', timestamp: '2026-01-05T11:30:00Z', description: 'First purchase: Garden Bliss', value: 490.25, product: '2' },
    ],
  },
];

export const priceOptimizations: PriceOptimization[] = [
  {
    productId: '1',
    productName: 'The Afuvai Purse',
    currentPrice: 225,
    recommendedPrice: 235,
    priceChange: 10,
    reason: 'High demand (84 units/YTD), strong margin. Whales show insensitivity to price.',
    estimatedImpact: '+$840 annual revenue (no volume loss)',
  },
  {
    productId: '4',
    productName: 'Primary Burst',
    currentPrice: 108,
    recommendedPrice: 99,
    priceChange: -9,
    reason: 'Low margin (49%), budget-tier favorite. Lower price = higher volume.',
    estimatedImpact: '+$445 annual revenue (15% volume lift)',
  },
  {
    productId: '6',
    productName: 'Ivory Reverie',
    currentPrice: 185,
    recommendedPrice: 195,
    priceChange: 10,
    reason: 'Wedding season demand (May-Jun). Limited stock perception.',
    estimatedImpact: '+$620 annual revenue (wedding events insensitive to price)',
  },
];

export const emailCampaigns: EmailCampaign[] = [
  {
    id: 'camp-1',
    name: 'Whale VIP Exclusive',
    segment: 'Whale tier customers',
    subject: '🌹 Exclusive VIP preview: New collection + early access',
    body: 'Dear {{name}}, as our most valued customer, you get first access to our new luxury collection. Free white-glove delivery included. Link to view',
    sent: 12,
    opened: 11,
    clicked: 9,
    converted: 7,
    status: 'sent',
  },
  {
    id: 'camp-2',
    name: 'At-Risk Winback',
    segment: 'Customers 30+ days inactive',
    subject: '💐 We miss you! Here\'s 20% off your next order',
    body: 'Hi {{name}}, it\'s been {{daysSinceLastOrder}} days since we last saw you. We\'ve missed your orders! Use code COMEBACK20 for 20% off.',
    sent: 34,
    opened: 14,
    clicked: 6,
    converted: 3,
    status: 'sent',
  },
  {
    id: 'camp-3',
    name: 'Referral Program Launch',
    segment: 'All active customers',
    subject: '🎁 Refer a friend, get $25 credit! (You both win)',
    body: 'Share the beauty! Invite friends and earn $25 in credits per successful referral. No limit on earnings.',
    sent: 287,
    opened: 78,
    clicked: 34,
    converted: 12,
    status: 'sent',
  },
];

export const integrationStatus: IntegrationStatus[] = [
  { name: 'Stripe', status: 'connected', lastSync: '2026-07-04T16:00:00Z' },
  { name: 'Supabase', status: 'connected', lastSync: '2026-07-04T15:55:00Z' },
  { name: 'Gmail/Google Workspace', status: 'connected', lastSync: '2026-07-04T14:00:00Z' },
  { name: 'Klaviyo (Email Marketing)', status: 'needs_setup', setupUrl: 'https://www.klaviyo.com/signup' },
  { name: 'Twilio (SMS/WhatsApp)', status: 'needs_setup', setupUrl: 'https://www.twilio.com/console/sms/project' },
  { name: 'Shopify (Inventory)', status: 'disconnected', setupUrl: 'https://www.shopify.com' },
  { name: 'Zapier (Automation)', status: 'needs_setup', setupUrl: 'https://zapier.com/sign-up' },
  { name: 'HubSpot (CRM)', status: 'disconnected', setupUrl: 'https://www.hubspot.com' },
  { name: 'Metabase (BI)', status: 'needs_setup', setupUrl: 'http://localhost:3000/metabase' },
  { name: 'Segment (Analytics)', status: 'disconnected', setupUrl: 'https://segment.com' },
];
