import type { Config } from "tailwindcss";

import { colors } from "./constants";

export default {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
} satisfies Config;
