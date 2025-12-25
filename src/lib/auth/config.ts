import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// User type
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'jobs_manager';
}

// Simple in-memory user store (replace with database in production)
// Password: "admin123" for all users
const users: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'admin@rhcsolutions.com',
    name: 'Admin User',
    role: 'admin',
    password: 'admin123',
  },
  {
    id: '2',
    email: 'editor@rhcsolutions.com',
    name: 'Editor User',
    role: 'editor',
    password: 'admin123',
  },
  {
    id: '3',
    email: 'jobs@rhcsolutions.com',
    name: 'Jobs Manager',
    role: 'jobs_manager',
    password: 'admin123',
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@rhcsolutions.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('[Auth] Missing credentials');
          return null;
        }

        const user = users.find((u) => u.email === credentials.email);
        if (!user) {
          console.log('[Auth] User not found:', credentials.email);
          return null;
        }

        // For now, use plaintext comparison (replace with proper bcrypt in production)
        console.log('[Auth] Checking password for:', user.email);
        const isValid = credentials.password === 'admin123';

        if (!isValid) {
          console.log('[Auth] Invalid password - expected: admin123, got:', credentials.password);
          return null;
        }

        console.log('[Auth] Login successful:', user.email);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
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
