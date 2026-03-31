import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.ts',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Hero section green palette from Figma
        'hero-dark': {
          DEFAULT: '#021E14',
          light: '#063C2C',
        },
        'hero-text': {
          DEFAULT: '#FFFFFF',
          muted: '#B6C2BD',
        },
        'hero-accent': {
          DEFAULT: '#22C55E',
          dark: '#022C22',
        },
        // Corematrix brand tokens
        corematrix: {
          bg0: '#040c07',
          bg1: '#060f0a',
          bg2: '#0a1a0f',
          card: '#0d1f14',
          card2: '#0f2318',
          border: '#1a3525',
          border2: '#1e3d2a',
          green900: '#052e16',
          green700: '#15803d',
          green500: '#22c55e',
          green400: '#4ade80',
          green300: '#86efac',
          textPrimary: '#f0fdf4',
          textSecondary: '#bbf7d0',
          textMuted: '#6b9e7a',
          textDim: '#3d6b4f',
        },
      },
    },
  },
  plugins: [],
};

export default config;
