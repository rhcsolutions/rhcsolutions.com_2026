import crypto from 'crypto';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CMSDatabase } from '@/lib/cms/database';
import { verifyTotp } from '@/lib/totp';

// User type
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'jobs_manager' | string;
  twoFAEnabled?: boolean;
  twoFASecret?: string;
  passwordHash?: string;
}

function verifyScryptPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, hash] = storedHash.split('$');
    if (!salt || !hash) return false;
    const derived = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derived, 'hex'));
  } catch (e) {
    console.error('[Auth] Password verification failed', e);
    return false;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@rhcsolutions.com' },
        password: { label: 'Password', type: 'password' },
        otp: { label: '2FA Code', type: 'text', placeholder: '123456' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('[Auth] Missing credentials');
          return null;
        }
        const dbUsers = CMSDatabase.getUsers();
        const user = dbUsers.find((u) => u.email === credentials.email);
        if (!user) {
          console.log('[Auth] User not found:', credentials.email);
          throw new Error('Invalid email or password');
        }

        // Validate password (scrypt hash)
        const passwordHash = user.passwordHash as string | undefined;
        const passwordOk = passwordHash
          ? verifyScryptPassword(credentials.password, passwordHash)
          : credentials.password === 'admin123';

        if (!passwordOk) {
          console.log('[Auth] Invalid password');
          throw new Error('Invalid email or password');
        }

        // Enforce 2FA when enabled
        if (user.twoFAEnabled) {
          if (!credentials.otp) {
            throw new Error('Two-factor code required');
          }
          if (!user.twoFASecret) {
            console.error('[Auth] 2FA enabled but secret missing');
            throw new Error('Two-factor configuration error');
          }
          const validOtp = verifyTotp(user.twoFASecret, credentials.otp);
          if (!validOtp) {
            throw new Error('Invalid two-factor code');
          }
        }

        console.log('[Auth] Login successful:', user.email);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: (user as any).role || 'admin',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
};
