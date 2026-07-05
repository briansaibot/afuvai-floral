// RBAC: Role-Based Access Control with PIN authentication

export type Role = 'admin' | 'manager' | 'viewer';

export interface Admin {
  id: string;
  username: string;
  displayName: string;
  pin: string; // 4-digit PIN
  role: Role;
  email?: string;
  createdAt: string;
  lastLogin?: string;
  active: boolean;
}

export interface AdminSession {
  id: string;
  username: string;
  displayName: string;
  role: Role;
  loginTime: string;
  expiresAt: string;
}

// Hardcoded admins for now (will migrate to database)
export const ADMINS: Admin[] = [
  {
    id: 'admin-001',
    username: 'AmiDayne',
    displayName: 'Ami',
    pin: '0599',
    role: 'admin',
    email: 'ami@afuvai.com',
    createdAt: '2026-01-01',
    active: true,
  },
  {
    id: 'admin-002',
    username: 'Brian',
    displayName: 'Brian',
    pin: '5503',
    role: 'admin',
    email: 'brian@afuvai.com',
    createdAt: '2026-01-01',
    active: true,
  },
];

// Permission matrix: what each role can do
export const PERMISSIONS: Record<Role, string[]> = {
  admin: [
    'view_dashboard',
    'view_customers',
    'view_orders',
    'view_analytics',
    'view_products',
    'view_reports',
    'view_alerts',
    'view_integrations',
    'view_operations',
    'edit_customers',
    'edit_orders',
    'edit_products',
    'send_emails',
    'send_sms',
    'create_campaigns',
    'manage_integrations',
    'manage_admins',
    'view_audit_logs',
    'export_data',
    'access_rbac_settings',
  ],
  manager: [
    'view_dashboard',
    'view_customers',
    'view_orders',
    'view_analytics',
    'view_products',
    'view_reports',
    'view_alerts',
    'edit_customers',
    'edit_orders',
    'send_emails',
    'send_sms',
    'create_campaigns',
    'export_data',
  ],
  viewer: [
    'view_dashboard',
    'view_customers',
    'view_orders',
    'view_analytics',
    'view_products',
    'view_reports',
  ],
};

// Helper functions
export function validatePin(username: string, pin: string): Admin | null {
  const admin = ADMINS.find(a => a.username === username && a.pin === pin && a.active);
  return admin || null;
}

export function canAccess(role: Role, permission: string): boolean {
  return PERMISSIONS[role]?.includes(permission) || false;
}

export function createSession(admin: Admin): AdminSession {
  const loginTime = new Date();
  const expiresAt = new Date(loginTime.getTime() + 12 * 60 * 60 * 1000); // 12 hours

  return {
    id: `session-${Date.now()}`,
    username: admin.username,
    displayName: admin.displayName,
    role: admin.role,
    loginTime: loginTime.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };
}

export function isSessionValid(session: AdminSession): boolean {
  return new Date(session.expiresAt) > new Date();
}
