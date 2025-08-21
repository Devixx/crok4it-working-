// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", //  adjust to your folders
  ],
  theme: {
    extend: {
      colors: {
        "brand-teal": "#4ADBC8",
        "brand-purple": "#6C22D9",
        "brand-dark": "#141414",
      },
    },
  },
  plugins: [],
};
