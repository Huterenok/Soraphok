import { defineConfig } from "@pandacss/dev"

export default defineConfig({
    preflight: true,
  	jsxFramework: 'react',
    include: ["./src/**/*.{js,jsx,ts,tsx}"],
    exclude: [],
    theme: {
      extend: {}
    },
		strictTokens: true,
		hash: true,
    outdir: "styled-system",
})