const { animation } = require("@angular/animations");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
      },
      backgroundImage: {
        portrait2: "url('/public/BioBg.jpg')",
        portrait: "url('/BackgroundPortrait.jpg')",
        bioImage: "url('/public/Image2.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
