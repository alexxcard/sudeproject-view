import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/containers/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      container: {
        padding: {
          DEFAULT: "0.25rem",
          sm: "0.5rem",
          md: "0.75rem",
          lg: "1rem",
          xl: "1.25rem",
          "2xl": "1.5rem",
        },
      },
    },
  },
  plugins: [],
};

export default config;
