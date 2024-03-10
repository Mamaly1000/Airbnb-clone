import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          from: {
            opacity: "0",
            transform: "translateY('50px')",
          },
          to: {
            opacity: "1",
            transform: "translateY('0')",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        slideIn: "slideIn 1s linear 1",
      },
      colors: {
        background: "var(--background)",
        dark_background: "var(--dark-background)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
