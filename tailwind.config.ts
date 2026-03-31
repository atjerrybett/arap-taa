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
        copper: {
          50: '#fdf5ef',
          100: '#fae8d4',
          200: '#f4cda8',
          300: '#edac72',
          400: '#e4863e',
          500: '#dc6b22',
          600: '#cd5318',
          700: '#ab3e16',
          800: '#893319',
          900: '#6f2c18',
          950: '#3c140a',
        },
        forest: {
          50: '#f3f6f4',
          100: '#e2eae4',
          200: '#c6d5cb',
          300: '#9fb8a7',
          400: '#73957e',
          500: '#527962',
          600: '#3f604d',
          700: '#344d40',
          800: '#2c3f35',
          900: '#25342d',
          950: '#141d19',
        },
        moss: {
          50: '#f5f7ee',
          100: '#e8edda',
          200: '#d3deb8',
          300: '#b5c88d',
          400: '#99b167',
          500: '#7c964b',
          600: '#607738',
          700: '#4b5c2e',
          800: '#3e4a28',
          900: '#364025',
          950: '#1b2211',
        },
        house: {
          evaline: '#cd5318',
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
