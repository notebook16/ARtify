/** @type {import('tailwindcss').Config} */
export default {
  content:  ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          'scrollbar-width': 'none', // Hides scrollbar for Firefox
          '-ms-overflow-style': 'none', // Hides scrollbar for IE and Edge
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none', // Hides scrollbar for Chrome, Safari, and Opera
        },
      });
    },
  ],
};

