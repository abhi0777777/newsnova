/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#0f0e0d",
          light: "#1c1a18",
        },
        paper: {
          DEFAULT: "#faf8f5",
          warm: "#f5f0e8",
        },
        accent: {
          red: "#c0392b",
          gold: "#d4a017",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "'DM Sans', sans-serif",
            color: "#0f0e0d",
            "h1,h2,h3,h4": { fontFamily: "'Playfair Display', serif" },
          },
        },
      },
    },
  },
  plugins: [],
};
