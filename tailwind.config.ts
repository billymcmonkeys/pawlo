import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF8EE",
          100: "#FFEECE",
          200: "#FFD78E",
          300: "#FFC15A",
          400: "#FFAA2C",
          500: "#F59500",
          600: "#D97D00",
          700: "#B36200",
          800: "#8A4A00",
          900: "#5C3000",
        },
        secondary: {
          50: "#EEF9F8",
          100: "#CCEEE9",
          200: "#99DDD4",
          300: "#66CCBF",
          400: "#33BBAA",
          500: "#00A896",
          600: "#008A7B",
          700: "#006B60",
          800: "#004D45",
          900: "#002E2A",
        },
        neutral: {
          0: "#FFFFFF",
          50: "#FAF8F5",
          100: "#F2EFE9",
          200: "#E2DDD5",
          300: "#C9C3B8",
          400: "#A89E91",
          500: "#7D7269",
          600: "#5C5349",
          700: "#3D3730",
          800: "#242019",
          900: "#111109",
        },
        success: {
          100: "#DCFCE7",
          500: "#22C55E",
        },
        warning: {
          100: "#FEF3C7",
          500: "#F59E0B",
        },
        error: {
          100: "#FEE2E2",
          500: "#EF4444",
        },
        info: {
          100: "#DBEAFE",
          500: "#3B82F6",
        },
      },
      fontFamily: {
        display: ["Nunito", "sans-serif"],
        body: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        rounded: ["Quicksand", "Nunito", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,0.06)",
        sm: "0 2px 8px rgba(0,0,0,0.08)",
        md: "0 4px 16px rgba(0,0,0,0.10)",
        lg: "0 8px 32px rgba(0,0,0,0.12)",
        xl: "0 16px 48px rgba(0,0,0,0.14)",
        mobile: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)",
        primary: "0 4px 16px rgba(245,149,0,0.30)",
      },
      fontSize: {
        "display-xl": ["32px", { lineHeight: "1.2", fontWeight: "800" }],
        "display-lg": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        display: ["26px", { lineHeight: "1.2", fontWeight: "800" }],
        h1: ["24px", { lineHeight: "1.25", fontWeight: "700" }],
        h2: ["20px", { lineHeight: "1.3", fontWeight: "700" }],
        h3: ["18px", { lineHeight: "1.35", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "1.6" }],
        body: ["15px", { lineHeight: "1.6" }],
        "body-sm": ["13px", { lineHeight: "1.5" }],
        label: ["14px", { lineHeight: "1.4", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "1.4", fontWeight: "500" }],
        caption: ["11px", { lineHeight: "1.4" }],
      },
      spacing: {
        "0.5": "2px",
      },
      transitionDuration: {
        instant: "100ms",
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
        spring: "500ms",
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      borderWidth: {
        hairline: "0.5px",
      },
      zIndex: {
        raised: "10",
        dropdown: "100",
        sticky: "200",
        modal: "300",
        overlay: "400",
        toast: "500",
      },
    },
  },
  plugins: [],
};

export default config;
