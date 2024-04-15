/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3D38ED",
        primaryMuted: "#C9C8FA",
        background: "#F5F5F5",
        dark: "#141518",
        gray: "#626D77",
        lightGray: "#D8DCE2",
      },
    },
  },
  plugins: [],
};
