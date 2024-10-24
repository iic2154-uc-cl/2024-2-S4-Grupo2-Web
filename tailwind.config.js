const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.6rem',  // Esto es equivalente a 9.6px
      },
      boxShadow: {
        'outline': '0 0 0 3px rgba(66, 153, 225, 0.5)'  // Esto crea un borde azul claro
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
});