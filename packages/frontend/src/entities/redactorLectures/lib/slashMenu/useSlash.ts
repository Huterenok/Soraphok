import { slash } from "../../config";
import { Slash } from "../../ui";
import { Ctx } from "@milkdown/ctx";
import { usePluginViewFactory } from "@prosemirror-adapter/react";

export const useSlash = () => {
  const pluginViewFactory = usePluginViewFactory();
  return {
    plugins: slash,
    config: (ctx: Ctx) => {
      ctx.set(slash.key, {
        view: pluginViewFactory({
          component: Slash,
        }),
        opened: false,
      });
    },
  };
};
