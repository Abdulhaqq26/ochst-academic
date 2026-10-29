/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        teal: {
          50: '#EBF5F2',
          100: '#D2E9E1',
          400: '#1C8E76',
          500: '#0B6E5A',
          600: '#08503F',
          700: '#063D30',
        },
        amber: {
          50: '#FBF0E7',
          100: '#F3D9C2',
          500: '#C2571B',
          600: '#9C4515',
        },
        cobalt: {
          50: '#EAF0F6',
          100: '#CEDDEA',
          500: '#2A5C8A',
          600: '#1F4568',
        },
        moss: {
          50: '#EBF3EC',
          500: '#2F7D4F',
          600: '#245F3D',
        },
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(17, 24, 21, 0.04), 0 10px 28px -12px rgba(17, 24, 21, 0.10)',
        'card-hover': '0 2px 6px rgba(17, 24, 21, 0.06), 0 18px 40px -16px rgba(17, 24, 21, 0.16)',
      },
    },
  },
  plugins: [],
}
