// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo-600
          hover: '#4338CA',
          light: '#818CF8',
        },
        brand: {
          purple: '#7C3AED',
          indigo: '#4F46E5',
        },
        secondary: '#F3F4F6', // Light gray background
        accent: '#4F46E5',
        background: '#F3F4F6', // App background
        foreground: '#111827', // Slate-900
        surface: '#FFFFFF', // Cards background
        muted: '#6B7280', // Slate-500
        success: '#10B981', // Emerald-500
        warning: '#F59E0B', // Amber-500
        danger: '#EF4444', // Red-500
        border: '#E5E7EB', // Gray-200
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        floating: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '2xl': '16px',
        xl: '12px',
        lg: '8px',
        pill: '9999px',
      }
    },
  },
  plugins: [],
} satisfies Config;
