/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'], // Updated to support .jsx files
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
        'pulse-subtle': 'pulse-subtle 1.5s infinite',
        glowing: 'glowing 2s infinite ease-in-out',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        glowing: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(124, 58, 237, 0.7)' },
          '50%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.9), 0 0 30px rgba(167, 139, 250, 0.5)' },
        },
      },
      boxShadow: {
        glow: '0 0 10px rgba(124, 58, 237, 0.7)',
      },
    },
  },
  plugins: [],
};