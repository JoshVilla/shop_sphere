/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        textColor: "var(--text-color)",
        darkSecondary: "var(--dark-secondary-color)",
        btnBg: "var(--dark-secondary-color)",
      },
    },
  },
  // Enable JIT mode for better performance and smaller CSS file size
  mode: "jit",
  // Enable purging unused CSS in production mode for optimization
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
};
