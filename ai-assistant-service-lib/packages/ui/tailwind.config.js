/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../apps/web/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#004D40",
          foreground: "#FFFFFF"
        },
        secondary: {
          DEFAULT: "#E0F2F1",
          foreground: "#004D40"
        }
      }
    },
  },
  plugins: [],
};