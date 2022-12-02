/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx, ts}"],

  theme: {
    extend: {
      backgroundPosition: {
        bottom: "bottom",
        "bottom-4": "center bottom 1rem",
        center: "center",
        left: "left",
        "left-bottom": "left bottom",
        "left-top": "left top",
        right: "right",
        "right-bottom": "right bottom",
        "right-top": "right top",
        top: "top",
        "top-4": "center top 4rem",
      },
    },
  },
  plugins: [],
};
