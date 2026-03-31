/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        dogbg: "#BCEFFF",
        catbg: "#FFECCE",
        smallpetbg: "#A5B9FE",
      },
    },
  },
  plugins: [],
};
