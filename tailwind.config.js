/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    keyframes: {
      pulseSlow: {
        '0%, 100%': { boxShadow: '0 0 15px rgba(255,180,50,0.7)' },
        '50%': { boxShadow: '0 0 25px rgba(255,180,50,1)' },
      },
    },
    animation: {
      'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
    },
  },
},
  plugins: [],
}