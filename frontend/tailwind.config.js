/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bgc: "hsl(var(--bgcolor)) / <alpha-value>",
        textc: "hsl(var(--textc)) / <alpha-value>",
        borderc: "hsl(var(--borderc)) / <alpha-value>",
        btnc: "hsl(var(--btnc)) / <alpha-value>",
        trc: "hsl(var(--trc)) / <alpha-value>",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
