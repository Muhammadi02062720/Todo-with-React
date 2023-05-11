/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      '2xl':  '2000px',
      // => @media (max-width: 1535px) { ... }

      'xl': '1622px',
      // => @media (max-width: 1279px) { ... }

      'lg':  '1244px',
      // => @media (max-width: 1023px) { ... }

      'md':  '866px',
      // => @media (max-width: 767px) { ... }

      'sm':  '488px',
      // => @media (max-width: 639px) { ... }
    },
    extend: {},
  },
  plugins: [],
}

