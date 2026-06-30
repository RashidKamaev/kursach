import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "#292323", cream: "#fbf7f4", rose: "#a85f70", blush: "#f6e7e8", sand: "#e8d7ca" },
    boxShadow: { soft: "0 12px 40px rgba(74,48,48,.08)" }
  }},
  plugins: []
} satisfies Config;
