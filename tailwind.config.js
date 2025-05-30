/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-in-out forwards',
      },
      colors: {
        purple: {
          600: '#7C3AED', // Color principal
        }
      },
      transitionProperty: {
          'width': 'width',
          'margin': 'margin'
      }
    },
  },
  plugins: [],
}
