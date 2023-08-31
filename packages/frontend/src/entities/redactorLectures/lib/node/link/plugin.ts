import { Plugin } from "@milkdown/prose/state";
import { DecorationSet } from "@milkdown/prose/view";
import { $prose } from "@milkdown/utils";
import type { useWidgetViewFactory } from "@prosemirror-adapter/react";
import { LinkWidgetAfter, LinkWidgetBefore } from "../../../ui";

export const linkPlugin = (
  widgetViewFactory: ReturnType<typeof useWidgetViewFactory>
) => {
  const before = widgetViewFactory({ as: "span", component: LinkWidgetBefore });
  const after = widgetViewFactory({ as: "span", component: LinkWidgetAfter });

  return $prose(
    () =>
      new Plugin({
        state: {
          init() {
            return DecorationSet.empty;
          },
          apply(tr) {
            const { selection } = tr;

            const { $from, $to } = selection;
            const node = tr.doc.nodeAt(selection.from);

            const mark = node?.marks.find((mark) => mark.type.name === "link");

            if (!mark) return DecorationSet.empty;

            let markPos = { start: -1, end: -1 };
            tr.doc.nodesBetween($from.start(), $to.end(), (n, pos) => {
              if (node === n) {
                markPos = {
                  start: pos,
                  end: pos + Math.max(n.textContent.length, 1),
                };

                // stop recursing if result is found
                return false;
              }
              return undefined;
            });

            return DecorationSet.create(tr.doc, [
              before(markPos.start),
              after(markPos.end, {
                href: mark.attrs.href,
                title: mark.attrs.title,
              }),
            ]);
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      })
  );
};
