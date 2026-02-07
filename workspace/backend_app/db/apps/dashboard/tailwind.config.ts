import type { Config } from "tailwindcss";
import daisyui from "daisyui";

import { colors } from "@corecount/tailwind-config/constants";
import baseConfig from "@corecount/tailwind-config/web";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
  plugins: [daisyui, require("@tailwindcss/forms"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        corecount: {
          primary: colors.green,
          "primary-content": "#000d16",
          secondary: "#ff0000",
          "secondary-content": "#160000",
          accent: colors.dark["40"],
          "accent-content": "#000900",
          neutral: colors.dark["70"],
          "neutral-content": "#cececb",
          "base-100": colors.dark["70"],
          "base-200": colors.dark["50"],
          "base-300": colors.dark["30"],
          "base-content": colors.light["10"],
          info: "#007cb2",
          "info-content": colors.light["10"],
          success: "#3ee068",
          "success-content": "#011204",
          warning: colors.orange,
          "warning-content": "#110c00",
          error: colors.red,
          "error-content": "#ffd7d9",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Chillax", "Arial", "sans-serif"],
      },
      colors: {
        green: "#01CFCC",
        purple: "#9E7CFF",
        orange: "#FFAE21",
        teal: "#00C6E9",
        pink: "#00C6E9",
        red: "#FF4F4F",
        dark: {
          20: "#8E969F",
          30: "#72808F",
          40: "#425A6E",
          50: "#253C50",
          60: "#1B3042",
          70: "#152533",
          80: "#0D1623",
          90: "#070D15",
        },
        light: {
          10: "#FFFFFF",
          20: "#E6FAFA",
          30: "#CCF5F5",
          40: "#99ECEB",
          50: "#01CFCC",
          60: "#00A6A5",
          70: "#007D7C",
          80: "#005352",
          90: "#002929",
        },
      },
    },
  },
} satisfies Config;
