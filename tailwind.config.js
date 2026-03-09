/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'noor-green': '#0F5132',
        'noor-green-dark': '#082b1a',
        'noor-green-light': '#1a7a4c',
        'noor-gold': '#D4AF37',
        'noor-gold-light': '#f0d571',
        'noor-gold-dark': '#aa8a29',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['"Noto Sans Arabic"', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.2)', borderColor: 'rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)', borderColor: 'rgba(212, 175, 55, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}