import { emojiSlash } from "../../config";
import { EmojiMenuSlash } from "../../ui";
import { Ctx } from "@milkdown/ctx";
import { usePluginViewFactory } from "@prosemirror-adapter/react";

const inspectKeys = ["ArrowDown", "ArrowUp", "Enter"];

export const useEmojiMenu = () => {
  const pluginViewFactory = usePluginViewFactory();
  return {
    plugins: emojiSlash,
    config: (ctx: Ctx) => {
      ctx.set(emojiSlash.key, {
        props: {
          handleKeyDown: (_, event) => {
            if (!ctx.get(emojiSlash.key).opened) {
              return false;
            }
            return inspectKeys.includes(event.key);
          },
        },
        view: pluginViewFactory({
          component: EmojiMenuSlash,
        }),
        opened: false,
      });
    },
  };
};
