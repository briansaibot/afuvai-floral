// Analytics & Business Intelligence Data
export interface DailyMetric {
  date: string;
  revenue: number;
  orders: number;
  newCustomers: number;
  whaleCount: number;
  vipCount: number;
}

export interface ProductMetric {
  name: string;
  id: string;
  revenue: number;
  units: number;
  margin: number;
  autoReorderRevenue: number;
  tier: string; // dominant tier buying this
}

export interface TierMetric {
  tier: string;
  count: number;
  totalSpent: number;
  avgOrderValue: number;
  returnRate: number;
  churnRate: number;
}

// MTD & YTD Revenue Data
export const revenueTrends: DailyMetric[] = [
  { date: 'Jul 1', revenue: 2840, orders: 12, newCustomers: 2, whaleCount: 3, vipCount: 8 },
  { date: 'Jul 2', revenue: 3450, orders: 15, newCustomers: 3, whaleCount: 3, vipCount: 9 },
  { date: 'Jul 3', revenue: 2120, orders: 9, newCustomers: 1, whaleCount: 3, vipCount: 8 },
  { date: 'Jul 4', revenue: 4280, orders: 18, newCustomers: 4, whaleCount: 4, vipCount: 10 },
];

export const monthlyMetrics = {
  mtd: {
    revenue: 12690,
    orders: 54,
    avgOrderValue: 235,
    newCustomers: 10,
    repeatPurchaseRate: 0.68,
    churnRate: 0.02,
  },
  ytd: {
    revenue: 287450,
    orders: 1224,
    avgOrderValue: 235,
    newCustomers: 187,
    repeatPurchaseRate: 0.72,
    churnRate: 0.035,
  },
  lastYear: {
    revenue: 142000, // 2025 comparison
    orders: 602,
  },
};

export const tierMetrics: TierMetric[] = [
  {
    tier: 'Whale',
    count: 12,
    totalSpent: 142000,
    avgOrderValue: 985,
    returnRate: 0.92,
    churnRate: 0.0,
  },
  {
    tier: 'VIP',
    count: 47,
    totalSpent: 98450,
    avgOrderValue: 385,
    returnRate: 0.68,
    churnRate: 0.02,
  },
  {
    tier: 'Standard',
    count: 278,
    totalSpent: 46850,
    avgOrderValue: 168,
    returnRate: 0.35,
    churnRate: 0.08,
  },
];

export const productMetrics: ProductMetric[] = [
  {
    name: 'The Afuvai Purse — Black Chain',
    id: '1',
    revenue: 18900,
    units: 84,
    margin: 0.55,
    autoReorderRevenue: 8450,
    tier: 'Whale',
  },
  {
    name: 'Ivory Reverie',
    id: '6',
    revenue: 15200,
    units: 82,
    margin: 0.52,
    autoReorderRevenue: 6200,
    tier: 'Whale',
  },
  {
    name: 'Lavender Dreams',
    id: '3',
    revenue: 12850,
    units: 60,
    margin: 0.48,
    autoReorderRevenue: 5100,
    tier: 'VIP',
  },
  {
    name: 'Garden Bliss',
    id: '2',
    revenue: 11200,
    units: 87,
    margin: 0.50,
    autoReorderRevenue: 3200,
    tier: 'Standard',
  },
  {
    name: 'Paradise Box',
    id: '5',
    revenue: 9850,
    units: 94,
    margin: 0.52,
    autoReorderRevenue: 4500,
    tier: 'Standard',
  },
  {
    name: 'Primary Burst',
    id: '4',
    revenue: 8450,
    units: 78,
    margin: 0.49,
    autoReorderRevenue: 2100,
    tier: 'Standard',
  },
];

export const operationalMetrics = {
  deliverySlots: [
    { slot: '9am', orders: 18, successRate: 0.98 },
    { slot: '2pm', orders: 24, successRate: 0.96 },
    { slot: '4pm', orders: 12, successRate: 0.94 },
  ],
  deliveryMethods: [
    { method: 'Photo', count: 38, avgTime: 45 }, // minutes
    { method: 'Signature', count: 16, avgTime: 62 },
  ],
  autoReorderMetrics: {
    eligible: 34,
    activeAutoReorders: 18,
    adoptionRate: 0.53,
    autoReorderRevenue: 29550,
    percentOfTotal: 0.103,
  },
};

export const customerAcquisition = [
  { channel: 'Organic (Instagram)', new: 45, conversion: 0.12 },
  { channel: 'Referral', new: 34, conversion: 0.28 },
  { channel: 'Wedding Events', new: 67, conversion: 0.18 },
  { channel: 'Classes', new: 28, conversion: 0.15 },
  { channel: 'Direct', new: 13, conversion: 0.08 },
];

export const tierProgression = [
  { from: 'Standard', to: 'VIP', count: 18, timeMonths: 4.2 },
  { from: 'VIP', to: 'Whale', count: 8, timeMonths: 6.5 },
  { from: 'Standard', to: 'Whale', count: 2, timeMonths: 11.0 },
];

export const churnAnalysis = {
  inactive6Months: 23,
  inactiveRate: 0.081,
  atRiskCustomers: 34, // 1-3 months inactive
  activeNow: 327,
  monthlyChurnTrend: [
    { month: 'Jan', churn: 0.045 },
    { month: 'Feb', churn: 0.052 },
    { month: 'Mar', churn: 0.038 },
    { month: 'Apr', churn: 0.041 },
    { month: 'May', churn: 0.035 },
    { month: 'Jun', churn: 0.028 },
    { month: 'Jul', churn: 0.025 },
  ],
};

export const learningDiscounts = {
  eligible: 325,
  claimedCount: 89,
  uptakeRate: 0.274,
  totalSaved: 4250,
  byTier: [
    { tier: 'Standard', uptake: 0.42, saved: 3200 },
    { tier: 'VIP', uptake: 0.15, saved: 950 },
    { tier: 'Whale', uptake: 0.08, saved: 100 },
  ],
};

export const seasonalTrends = [
  { month: 'January', revenue: 28450, context: 'New Year, anniversaries' },
  { month: 'February', revenue: 42100, context: 'Valentine\'s Day peak' },
  { month: 'March', revenue: 31200, context: 'Spring events' },
  { month: 'April', revenue: 45300, context: 'Wedding season starts' },
  { month: 'May', revenue: 52800, context: 'Wedding season peak' },
  { month: 'June', revenue: 48200, context: 'Summer events, graduations' },
];

export const ltvProjection = {
  standard: {
    current: 168,
    projected12m: 285,
    projected24m: 450,
  },
  vip: {
    current: 2095,
    projected12m: 3200,
    projected24m: 4800,
  },
  whale: {
    current: 11833,
    projected12m: 15000,
    projected24m: 22000,
  },
};
