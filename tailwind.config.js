/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    data: {
      active: 'ui~="active"',
    },
    extend: {
      boxShadow: {
        DEFAULT:
          "0 1px 2px 1px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      },
      colors: {
        lavender: {
          500: "#5171c4",
          700: "#3e54a0",
        },
        lightgray: "#f4f5f9",
        lightblue: "#e4eefb",
      },
    },
  },
  plugins: [],
};
