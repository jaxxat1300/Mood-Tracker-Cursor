/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern sleek color palette
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          DEFAULT: '#2C3E50',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          DEFAULT: '#34495E',
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#3498DB',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          DEFAULT: '#3498DB',
        },
        success: '#27AE60',
        warning: '#E67E22',
        danger: '#E74C3C',
        border: '#E1E8ED',
        surface: '#FFFFFF',
        background: '#F8F9FA',
        'text-primary': '#2C3E50',
        'text-secondary': '#7F8C8D',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'Helvetica Neue', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'modern': '8px',
        'modern-lg': '12px',
      },
      boxShadow: {
        'modern': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'modern-hover': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
