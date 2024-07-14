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
      animation: {
        squeeze: "squeeze linear forwards",
      },
      keyframes: {
        squeeze: {
          "0%": { width: "100%", left: "0" },
          "100%": { width: "0", left: "50%" },
        },
      },
    },
  },
  darkMode: "class",
  safelist: [
    {
      pattern: /bg-(red|green|blue|yellow|gray)-(100|200|300|400|500)/,
    },
    "border-[2px]",
    "border-[3px]",
    "border-[4px]",
    "top-[20px]",
    "left-[20px]",
    "top-[34px]",
    "left-[34px]",
    "top-[50px]",
    "left-[50px]",
    "w-[20px]",
    "h-[20px]",
    "w-[28px]",
    "h-[28px]",
    "w-[34px]",
    "h-[34px]",
    "w-[50px]",
    "h-[50px]",
    "w-[60px]",
    "h-[60px]",
    "w-[80px]",
    "h-[80px]",
  ],
};
