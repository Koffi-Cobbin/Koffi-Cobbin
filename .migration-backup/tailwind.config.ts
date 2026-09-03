import type { Config } from 'tailwindcss';

// NOTE: These are placeholder tokens only. Phase 0.5 (visual identity) will
// replace this palette/type scale once real branding is defined — see
// README.md. Kept intentionally quiet/neutral so no premature brand
// decisions get baked into components.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16181c',
        paper: '#fafaf9',
        line: '#e4e4e0',
        muted: '#6b6f76',
        accent: {
          software: '#3b5bdb',
          hardware: '#c2410c',
          impact: '#0f7a4d',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
