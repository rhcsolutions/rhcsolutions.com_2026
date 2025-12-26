import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'cms-data');
const THEME_FILE = path.join(DATA_DIR, 'theme.json');

interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  success: string;
  error: string;
  warning: string;
  info: string;
}

interface ThemeFonts {
  primary: string;
  secondary: string;
  mono: string;
}

interface ThemeFontSizes {
  primary: string;
  secondary: string;
  mono: string;
}

interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
  fontSizes: ThemeFontSizes;
  borderRadius: string;
  shadowIntensity: 'light' | 'medium' | 'heavy';
  updatedAt: string;
  updatedBy?: string;
}

const defaultTheme: Theme = {
  colors: {
    primary: '#00FF41',
    primaryDark: '#0A0E27',
    secondary: '#00F0FF',
    accent: '#00AAFF',
    success: '#00FF88',
    error: '#FF4458',
    warning: '#FFB800',
    info: '#00F0FF',
  },
  fonts: {
    primary: 'Inter, system-ui, sans-serif',
    secondary: 'Space Grotesk, system-ui, sans-serif',
    mono: 'JetBrains Mono, Courier New, monospace',
  },
  fontSizes: {
    primary: '16px',
    secondary: '16px',
    mono: '14px',
  },
  borderRadius: '0.5rem',
  shadowIntensity: 'medium',
  updatedAt: new Date().toISOString(),
};

function mergeTheme(data: any): Theme {
  const incoming = data || {};
  return {
    ...defaultTheme,
    ...incoming,
    colors: { ...defaultTheme.colors, ...(incoming.colors || {}) },
    fonts: { ...defaultTheme.fonts, ...(incoming.fonts || {}) },
    fontSizes: { ...defaultTheme.fontSizes, ...(incoming.fontSizes || {}) },
    updatedAt: incoming.updatedAt || defaultTheme.updatedAt,
    updatedBy: incoming.updatedBy,
  };
}

async function initTheme(): Promise<Theme> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  try {
    const data = await fs.readFile(THEME_FILE, 'utf-8');
    return mergeTheme(JSON.parse(data));
  } catch {
    const merged = mergeTheme(defaultTheme);
    await fs.writeFile(THEME_FILE, JSON.stringify(merged, null, 2));
    return merged;
  }
}

async function checkRole(token: any) {
  if (!token || !['admin', 'editor'].includes(token.role)) {
    return false;
  }
  return true;
}

export async function GET() {
  try {
    const theme = await initTheme();
    console.log('[API] GET /api/cms/theme - Theme loaded:', theme.updatedAt);
    return NextResponse.json(theme);
  } catch (error) {
    console.error('[API] GET /api/cms/theme error:', error);
    return NextResponse.json({ error: 'Failed to fetch theme' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Try reading JWT token first, then fall back to server session
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
    });
    const session = await getServerSession(authOptions);

    const email = (token as any)?.email || (session?.user as any)?.email;
    const role = (token as any)?.role || (session?.user as any)?.role;

    console.log(
      '[API] PUT /api/cms/theme - Auth:',
      email && role ? `email=${email}, role=${role}` : token ? 'token only, no email/role' : session ? 'session only, no email/role' : 'no auth'
    );

    // Allow any authenticated user to update theme (role-agnostic)
    if (!email) {
      console.warn('[API] PUT /api/cms/theme - Unauthorized: no authenticated user');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const theme: Theme = {
      ...mergeTheme(body),
      updatedAt: new Date().toISOString(),
      updatedBy: email || 'admin',
    };

    await fs.writeFile(THEME_FILE, JSON.stringify(theme, null, 2));
    console.log('[API] PUT /api/cms/theme - Theme updated by', (token as any)?.email, '- file written');
    return NextResponse.json(theme);
  } catch (error) {
    console.error('[API] PUT /api/cms/theme error:', error);
    return NextResponse.json({ error: 'Failed to update theme' }, { status: 500 });
  }
}
