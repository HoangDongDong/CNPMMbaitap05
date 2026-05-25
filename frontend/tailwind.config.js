/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: "#0f172a",
        sand: "#f7f3ee",
        clay: "#e7ded5",
        sea: "#0f766e",
        dusk: "#1f2937",
        glow: "#f6c26b",
      },
      boxShadow: {
        bloom: "0 24px 60px -30px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
};
