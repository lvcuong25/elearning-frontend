/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "375px", // mobile minimum
      md: "768px", // tablet
      lg: "1024px", // desktop
    },
    extend: {},
  },
  plugins: [],
}
