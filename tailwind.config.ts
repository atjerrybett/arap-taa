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
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        earth: {
          50: '#faf6f1',
          100: '#f0e6d8',
          200: '#e1ccb1',
          300: '#cfac84',
          400: '#be8d5c',
          500: '#b17a4a',
          600: '#9a633e',
          700: '#7d4d35',
          800: '#684131',
          900: '#57372b',
          950: '#301c15',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e4ebe4',
          200: '#c9d7ca',
          300: '#a3baa5',
          400: '#789a7c',
          500: '#587c5c',
          600: '#446349',
          700: '#38503c',
          800: '#2f4132',
          900: '#28362b',
          950: '#131d16',
        },
        house: {
          evaline: '#d97706',
          jonah: '#0891b2',
          samson: '#7c3aed',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
