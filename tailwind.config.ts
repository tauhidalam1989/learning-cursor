import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
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
      },
    },
  },
  plugins: [],
};

export default config;
