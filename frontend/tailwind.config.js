/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dominant: '#020202',
        surface: '#0a0a0c',
        card: '#121216',
        cardHover: '#18181f',
        accent: {
          DEFAULT: '#ff1d25',
          hover: '#e0121a',
          glow: 'rgba(255, 29, 37, 0.4)'
        },
        muted: '#94a3b8',
        subtle: '#334155'
      },
      fontFamily: {
        heading: ['"Archivo Black"', 'Raleway', 'sans-serif'],
        archivo: ['"Archivo Black"', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        sans: ['Raleway', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
