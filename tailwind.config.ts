import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme - Primary backgrounds
        dark: {
          DEFAULT: '#0A0E27',      // Deep space blue-black
          lighter: '#1A1F3A',      // Slightly lighter panels
          card: '#151B2F',         // Card backgrounds
          border: '#1E2642',       // Borders and grid lines
          input: '#0F131F',        // Input fields
        },
        // Accent colors - Neon palette
        neon: {
          green: '#00FF41',        // Terminal green (Matrix style)
          cyan: '#00F0FF',         // Neon cyan
          amber: '#FFB800',        // Amber warning
          blue: '#00AAFF',         // Neon blue
          purple: '#BB86FC',       // Neon purple
          red: '#FF4458',          // Error red
          success: '#00FF88',      // Success green
        },
        // Text colors
        text: {
          primary: '#E8E8E8',      // White text
          secondary: '#8892A6',    // Gray secondary
          muted: '#6B7B8C',        // Muted gray
          dark: '#0A0E27',         // Dark text on light
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        grotesk: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Hero scale
        'hero': ['72px', { lineHeight: '4.5rem', letterSpacing: '-0.02em' }],
        'h1': ['48px', { lineHeight: '3rem', letterSpacing: '-0.01em' }],
        'h2': ['36px', { lineHeight: '2.25rem', letterSpacing: '-0.01em' }],
        'h3': ['24px', { lineHeight: '1.5rem' }],
        'body': ['16px', { lineHeight: '1.6rem' }],
        'small': ['14px', { lineHeight: '1.25rem' }],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0A0E27 0%, #1A1F3A 50%, #0A0E27 100%)',
        'gradient-neon': 'linear-gradient(135deg, #00FF41 0%, #00F0FF 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00AAFF 0%, #00F0FF 100%)',
        'grid-dark': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E2642' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 65, 0.5)',
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.5)',
        'glow-blue': '0 0 20px rgba(0, 170, 255, 0.5)',
        'card': '0 8px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 12px 32px rgba(0, 255, 65, 0.1)',
      },
      backdropFilter: {
        'blur': 'blur(10px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'scale-up': 'scaleUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 1s infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 65, 0.8)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 25px rgba(0, 240, 255, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
