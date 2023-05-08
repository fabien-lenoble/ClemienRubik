/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--color-tertiary) / <alpha-value>)",
        quaternary: "rgb(var(--color-quaternary) / <alpha-value>)",
        quinary: "rgb(var(--color-quinary) / <alpha-value>)",
        senary: "rgb(var(--color-senary) / <alpha-value>)",
        selected: "rgb(var(--color-selected) / <alpha-value>)",
        "my-text-primary": "rgb(var(--color-my-text-primary) / <alpha-value>)",
        "my-text-secondary":
          "rgb(var(--color-my-text-secondary) / <alpha-value>)",
      },
    },
  },
  darkMode: "class",
};
