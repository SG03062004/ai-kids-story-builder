import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [heroui({
    themes: {
      light: {
        // ...
        colors: {
          primary:{
            DEFAULT:"#5253A3"
          }
        },
      },
      dark: {
        // ...
        colors: {
          primary:{
            DEFAULT:"#5253A3"
          }
        },
      },
      // ... custom themes
    },
  })],
};

export default config;
