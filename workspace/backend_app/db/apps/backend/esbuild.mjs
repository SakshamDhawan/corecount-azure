import { sentryEsbuildPlugin } from "@sentry/esbuild-plugin";
import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  platform: "node",
  outdir: "dist",
  bundle: true,
  loader: {
    ".node": "file",
  },
  sourcemap: true, // Source map generation must be turned on
  // plugins: [sentryEsbuildPlugin({
  //   authToken: process.env.SENTRY_AUTH_TOKEN,
  //   release: {
  //     name: process.env.npm_package_version,
  //     dist: "backend",
  //     cleanArtifacts: true
  //   },
  //   org: 'the-barn-games',
  //   project: 'teamup',
  // })]
});
