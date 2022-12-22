/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "at-light-green": "#44ba9f",
        "at-green": "#286d5d",
        "light-grey": "#f1f1f1"
      }
    },
    fontFamily: {
      Poppins: ["Poppins, sans-serif"],
    },
    flex: {
      "1": "1 1 0%",
      "2": "2 2 0%",
    }
  },
  plugins: [],
};
