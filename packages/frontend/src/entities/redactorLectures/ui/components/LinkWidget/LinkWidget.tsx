import { commandsCtx } from "@milkdown/core";
import { updateLinkCommand } from "@milkdown/preset-commonmark";
import { useInstance } from "@milkdown/react";
import { useWidgetViewContext } from "@prosemirror-adapter/react";
import { linkLabel, linkInput, closingBracket } from "./LinkWidget.module.scss";

export const LinkWidgetBefore = () => {
  return <>[</>;
};

export const LinkWidgetAfter = () => {
  const { spec } = useWidgetViewContext();
  const [loading, editor] = useInstance();
  const href = spec?.href ?? "";

  return (
    <>
      <span>
        <span className={closingBracket}>]</span>(
        {
          <>
            <small className={linkLabel}>link: </small>
            <input
              size={href.length}
              placeholder="empty"
              onBlur={(e) => {
                if (loading) return;
                editor().action((ctx) => {
                  const commands = ctx.get(commandsCtx);
                  commands.call(updateLinkCommand.key, {
                    href: e.target.value,
                  });
                });
              }}
              className={linkInput}
              type="text"
              defaultValue={href}
            />
          </>
        }
        )
      </span>
    </>
  );
};


