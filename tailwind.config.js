/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#12121a",
        border: "#1e1e2e",
        cyan: {
          neon: "#00ffcc",
        },
        green: {
          neon: "#39ff14",
        },
        text: {
          primary: "#e2e8f0",
          muted: "#64748b",
          accent: "#00ffcc",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Courier New", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 255, 204, 0.3)",
        "neon-strong": "0 0 40px rgba(0, 255, 204, 0.6)",
      },
    },
  },
  plugins: [],
};
