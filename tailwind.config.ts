import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FBF8EF",
        "dark-gray": "#303030",
      },
      fontFamily: {
        tiempos: ["Tiempos Headline Light", "sans-serif"],
        mono: ["ABC Monument Grotesk Mono", "monospace"],
      },
    },
  },
  plugins: [require('tailwindcss-textshadow')],
  darkMode: "class",
} satisfies Config;
