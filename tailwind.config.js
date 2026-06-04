/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "Impact", "sans-serif"],
        heading: ["'Barlow Condensed'", "'Barlow'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      colors: {
        acid: "#B8FF00",
        obsidian: "#080808",
        ink: "#0F0F0F",
        surface: "#141414",
        "surface-2": "#1C1C1C",
        "surface-3": "#242424",
        border: "#2A2A2A",
        "border-2": "#333333",
        muted: "#666666",
        dim: "#444444",
        silver: "#AAAAAA",
        offwhite: "#E8E8E8",
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "9xl": ["8rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "ticker-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        flip: {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(-90deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.4s ease both",
        "ticker-left": "ticker-left 40s linear infinite",
        flip: "flip 0.35s ease",
        pulse2: "pulse2 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(184,255,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,255,0,0.04) 1px, transparent 1px)",
        "acid-glow":
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,255,0,0.12) 0%, transparent 70%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
    },
  },
  plugins: [],
};
