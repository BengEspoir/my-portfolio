/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f2ff",
          100: "#e6e1ff",
          200: "#cfc4ff",
          300: "#b19cff",
          400: "#8b6df8",
          500: "#6b57ea",
          600: "#5b46d8",
          700: "#4e37bf"
        },
        secondary: {
          50: "#fff5eb",
          100: "#ffeed6",
          400: "#ff9c42",
          500: "#ff8210",
          600: "#e66c00"
        },
        tertiary: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488"
        }
      },
      fontFamily: {
        sans: ["Poppins", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(35, 28, 72, 0.08)",
        card: "0 8px 24px rgba(17, 24, 39, 0.08)"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out"
      }
    }
  },
  plugins: []
};
