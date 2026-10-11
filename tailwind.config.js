/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#171B22',
        deepCharcoal: '#252A31',
        warmWhite: '#F4F1EA',
        pureWhite: '#FFFFFF',
        mutedBronze: '#B58A55',
        softBorder: '#D8D4CC',
        mutedText: '#686A6C',
        lightText: '#C4C5C7',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        coachella: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        charlize: ['"Alex Brush"', '"Cormorant Garamond"', 'cursive'],
        editorial: ['"Cormorant Garamond"', 'serif'],
      },
      letterSpacing: {
        'widest-plus': '0.22em',
      }
    },
  },
  plugins: [],
}
