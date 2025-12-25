import { getToken } from 'next-auth/jwt';
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

interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
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
  borderRadius: '0.5rem',
  shadowIntensity: 'medium',
  updatedAt: new Date().toISOString(),
};

async function initTheme(): Promise<Theme> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  try {
    const data = await fs.readFile(THEME_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    await fs.writeFile(THEME_FILE, JSON.stringify(defaultTheme, null, 2));
    return defaultTheme;
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
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'
    });
    console.log('[API] PUT /api/cms/theme - Token:', token ? `email=${(token as any)?.email}, role=${(token as any)?.role}` : 'no token');
    
    if (!(await checkRole(token))) {
      console.warn('[API] PUT /api/cms/theme - Forbidden: user role not admin/editor');
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const theme: Theme = {
      ...body,
      updatedAt: new Date().toISOString(),
      updatedBy: (token as any)?.email || 'admin',
    };

    await fs.writeFile(THEME_FILE, JSON.stringify(theme, null, 2));
    console.log('[API] PUT /api/cms/theme - Theme updated by', (token as any)?.email, '- file written');
    return NextResponse.json(theme);
  } catch (error) {
    console.error('[API] PUT /api/cms/theme error:', error);
    return NextResponse.json({ error: 'Failed to update theme' }, { status: 500 });
  }
}
