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
        primary: 'hsl(222,47%,11%)',
        secondary: 'hsl(210,40%,96%)',
        accent: 'hsl(14,100%,57%)',
        background: 'hsl(0,0%,100%)',
        foreground: 'hsl(222,47%,11%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
