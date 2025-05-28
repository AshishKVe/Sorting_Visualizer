/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary and accent colors
        primary: {
          DEFAULT: '#7C3AED', // Purple
          light: '#A78BFA',
          dark: '#6D28D9',
        },
        // Background colors
        background: {
          DEFAULT: '#1F2937',
          dark: '#111827',
        },
        // Feedback colors
        success: '#10B981', // Green
        error: '#EF4444',   // Red
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        slideIn: 'slideIn 0.5s ease-out',
        pulse: 'pulse 2s infinite',
        shake: 'shake 0.3s ease-in-out',
      },
      boxShadow: {
        glow: '0 0 10px rgba(124, 58, 237, 0.7)',
      },
    },
  },
  plugins: [],
};