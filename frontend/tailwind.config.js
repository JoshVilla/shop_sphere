/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        background: "var(--background-color)",
        text: "var(--text-color)",
        border: "var(--border-color)",
      },
    },
  },
  plugins: [],
};
