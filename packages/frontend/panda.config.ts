import { defineConfig } from "@pandacss/dev";
import {
  themeColors as colors,
  fontSizes,
  fontWeights,
  borders,
  globalStyle as globalCss,
} from "shared/config/ui";

export default defineConfig({
  preflight: true,
  jsxFramework: "react",
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors,
        fontSizes,
        fontWeights,
        borders,
      },
    },
  },
  globalCss,
  strictTokens: true,
  hash: true,
  outdir: "styled-system",
});
