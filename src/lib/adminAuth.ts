// Frontend-only mock admin authentication.
// Uses localStorage exclusively — no backend, database, or API calls.

export const ADMIN_EMAIL = 'admin@ochst.edu.ng';

const ACCOUNT_KEY = 'ochst-admin-account-v1';
const SESSION_KEY = 'ochst-admin-session-v1';

interface AdminAccount {
  email: string;
  password: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
}

export function isValidAdminEmail(email: string): boolean {
  return email.trim().toLowerCase() === ADMIN_EMAIL;
}

function getAdminAccount(): AdminAccount | null {
  try {
    const raw = localStorage.getItem(ACCOUNT_KEY);
    return raw ? (JSON.parse(raw) as AdminAccount) : null;
  } catch {
    return null;
  }
}

export function registerAdmin(email: string, password: string): AuthResult {
  const normalizedEmail = email.trim().toLowerCase();

  if (!isValidAdminEmail(normalizedEmail)) {
    return {
      success: false,
      error: `Invalid admin email. Admin accounts must use exactly "${ADMIN_EMAIL}".`,
    };
  }

  if (!password || password.length < 4) {
    return { success: false, error: 'Password must be at least 4 characters.' };
  }

  try {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify({ email: normalizedEmail, password }));
    return { success: true };
  } catch {
    return { success: false, error: 'Unable to save admin account on this device.' };
  }
}

export function loginAdmin(email: string, password: string): AuthResult {
  const normalizedEmail = email.trim().toLowerCase();

  if (!isValidAdminEmail(normalizedEmail)) {
    return {
      success: false,
      error: `Invalid admin email. Only "${ADMIN_EMAIL}" is permitted to log in as admin.`,
    };
  }

  const account = getAdminAccount();
  if (!account || account.email !== normalizedEmail || account.password !== password) {
    return {
      success: false,
      error: 'Incorrect password, or no admin account has been registered on this device yet.',
    };
  }

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: normalizedEmail, loggedInAt: Date.now() }));
    return { success: true };
  } catch {
    return { success: false, error: 'Unable to start admin session on this device.' };
  }
}

export function hasAdminSession(): boolean {
  try {
    return localStorage.getItem(SESSION_KEY) !== null;
  } catch {
    return false;
  }
}

export function logoutAdmin(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // storage unavailable — nothing to clean up
  }
}
