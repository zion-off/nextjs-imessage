import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        windowBg: "var(--window-bg)",
        windowBar: "var(--window-bar)",
        sendBubble: "var(--send-bubble)",
        receiveBubble: "var(--receive-bubble)",
        fieldOutline: "#7e7f86",
        close: "#fe5f57",
        minimize: "#febb2c",
        maximize: "#28c740",
        button: "#1675db",
        inputOutline: "#3e79a4",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
