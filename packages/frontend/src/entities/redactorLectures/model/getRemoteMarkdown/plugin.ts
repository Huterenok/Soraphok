import { editorStateTimerCtx, defaultValueCtx } from "@milkdown/core";
import { MilkdownPlugin, createTimer } from "@milkdown/ctx";

const RemoteTimer = createTimer("RemoteTimer");

export const getMarkdownPlugin: MilkdownPlugin = (ctx) => {
  ctx.record(RemoteTimer);

  return async () => {
    ctx.update(editorStateTimerCtx, (timers) => timers.concat(RemoteTimer));
    const defaultMarkdown = `
		::note{type="Info" title="clal" text="dds"}
		`; // await fetchMarkdownAPI()
    ctx.set(defaultValueCtx, defaultMarkdown);

    ctx.done(RemoteTimer);

    return async () => {
      ctx.clearTimer(RemoteTimer);
    };
  };
};
