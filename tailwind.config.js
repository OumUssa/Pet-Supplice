/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        dogbg: "#BCEFFF",
        catbg: "#FFECCE",
        smallpetbg: "#A5B9FE",
      },
    },
  },
  plugins: [],
};
