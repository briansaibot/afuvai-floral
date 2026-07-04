export interface Alert {
  id: string;
  name: string;
  type: 'revenue' | 'customer' | 'product' | 'operational';
  condition: string;
  threshold: number;
  operator: '>' | '<' | '==' | '!=' | '>=' | '<=';
  enabled: boolean;
  notifyEmail?: string;
  lastTriggered?: string;
  createdAt: string;
}

export interface AlertEvent {
  id: string;
  alertId: string;
  timestamp: string;
  value: number;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  read: boolean;
}

export const defaultAlerts: Alert[] = [
  {
    id: 'alert-1',
    name: 'Low Daily Revenue',
    type: 'revenue',
    condition: 'Daily revenue drops below',
    threshold: 2000,
    operator: '<',
    enabled: true,
    notifyEmail: 'brian@afuvai.com',
    lastTriggered: '2026-07-03T11:20:00Z',
    createdAt: '2026-06-01T10:00:00Z',
  },
  {
    id: 'alert-2',
    name: 'High Churn Rate',
    type: 'customer',
    condition: 'Monthly churn rate exceeds',
    threshold: 5,
    operator: '>',
    enabled: true,
    notifyEmail: 'brian@afuvai.com',
    createdAt: '2026-06-01T10:00:00Z',
  },
  {
    id: 'alert-3',
    name: 'New Whale Customer',
    type: 'customer',
    condition: 'New Whale tier customer acquired',
    threshold: 1,
    operator: '>=',
    enabled: true,
    notifyEmail: 'brian@afuvai.com',
    lastTriggered: '2026-07-04T08:15:00Z',
    createdAt: '2026-06-01T10:00:00Z',
  },
  {
    id: 'alert-4',
    name: 'Product Low Stock',
    type: 'product',
    condition: 'Product stock falls below',
    threshold: 5,
    operator: '<',
    enabled: true,
    createdAt: '2026-06-01T10:00:00Z',
  },
  {
    id: 'alert-5',
    name: 'Delivery Failure Rate High',
    type: 'operational',
    condition: 'Delivery success rate drops below',
    threshold: 95,
    operator: '<',
    enabled: true,
    notifyEmail: 'brian@afuvai.com',
    createdAt: '2026-06-01T10:00:00Z',
  },
  {
    id: 'alert-6',
    name: 'Auto-Reorder Revenue Milestone',
    type: 'revenue',
    condition: 'Auto-reorder revenue reaches',
    threshold: 30000,
    operator: '>=',
    enabled: true,
    notifyEmail: 'brian@afuvai.com',
    lastTriggered: '2026-07-04T14:30:00Z',
    createdAt: '2026-06-01T10:00:00Z',
  },
];

export const recentAlertEvents: AlertEvent[] = [
  {
    id: 'event-1',
    alertId: 'alert-3',
    timestamp: '2026-07-04T08:15:00Z',
    value: 1,
    message: 'New Whale tier customer (Wendy N.) acquired',
    severity: 'info',
    read: false,
  },
  {
    id: 'event-2',
    alertId: 'alert-6',
    timestamp: '2026-07-04T14:30:00Z',
    value: 29550,
    message: 'Auto-reorder revenue milestone reached: $29,550',
    severity: 'info',
    read: false,
  },
  {
    id: 'event-3',
    alertId: 'alert-1',
    timestamp: '2026-07-03T11:20:00Z',
    value: 1800,
    message: 'Daily revenue low: $1,800 (threshold: $2,000)',
    severity: 'warning',
    read: true,
  },
  {
    id: 'event-4',
    alertId: 'alert-2',
    timestamp: '2026-06-28T09:45:00Z',
    value: 2.8,
    message: 'Monthly churn rate: 2.8% (within acceptable range)',
    severity: 'info',
    read: true,
  },
];
