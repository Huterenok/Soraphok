import { defineGlobalStyles } from "@pandacss/dev";

export const globalStyle = defineGlobalStyles({
  "html, body": {
    background: "backGround.main",
    height: "100%",
  },
  "*": {
    color: "colors.default",
  },
});
