import baseConfig from "@corecount/eslint-config/base";
import reactConfig from "@corecount/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
