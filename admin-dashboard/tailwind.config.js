/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14213d",
        highlight: "#fca311",
        bgGray: "#e5e5e5",
        white: "#ffffff",
        black: "#000000",
        twilightfog: "#003566",
      },
      backgroundImage: {
        "hero-pattern": "url('./pages/index-Image.jpg')",
      },
    },
  },
  plugins: [],
};
