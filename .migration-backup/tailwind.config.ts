import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // ─── Color System ─────────────────────────────────────────────
      // Base neutrals with warm undertone for cohesion
      colors: {
        ink: {
          DEFAULT: '#1c1917', // Stone 900 - deep charcoal
          light: '#292524',   // Stone 800
        },
        paper: {
          DEFAULT: '#fafaf9', // Stone 50 - warm off-white
          dark: '#f5f5f4',    // Stone 100
        },
        line: {
          DEFAULT: '#e7e5e4', // Stone 200 - subtle border
          light: '#f5f5f4',   // Stone 100 - dividers
        },
        muted: {
          DEFAULT: '#78716c', // Stone 500 - secondary text
          light: '#a8a29e',   // Stone 400
          dark: '#57534e',    // Stone 600
        },

        // ─── Discipline Accents ────────────────────────────────────
        // Software: Cool blue-cyan (code, precision, digital)
        software: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Primary
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },

        // Hardware: Warm orange-amber (physical, tangible, industrial)
        hardware: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Primary
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },

        // Impact: Organic green (growth, change, human-centered)
        impact: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Primary
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },

      // ─── Typography ───────────────────────────────────────────────
      fontFamily: {
        display: [
          'var(--font-display)',
          'Instrument Serif',
          'Georgia',
          'serif',
        ],
        body: [
          'var(--font-body)',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-mono)',
          'JetBrains Mono',
          'Fira Code',
          'monospace',
        ],
      },

      // ─── Spacing & Sizing ─────────────────────────────────────────
      maxWidth: {
        prose: '68ch',
        content: '1200px',
      },

      // ─── Animations ───────────────────────────────────────────────
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },

      // ─── Shadows ──────────────────────────────────────────────────
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.06)',
        'lift': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
