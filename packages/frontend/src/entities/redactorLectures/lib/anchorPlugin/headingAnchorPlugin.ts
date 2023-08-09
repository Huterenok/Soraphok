import { headingSchema } from "@milkdown/preset-commonmark";
import { Plugin, Transaction } from "@milkdown/prose/state";
import type { Decoration } from "@milkdown/prose/view";
import { DecorationSet } from "@milkdown/prose/view";
import { $prose } from "@milkdown/utils";
import type { useWidgetViewFactory } from "@prosemirror-adapter/react";
import { HeadingWidget } from "../../ui";
import { Node } from "@milkdown/prose/model";
import debounce from "lodash.debounce";

export const headingAnchorPlugin = (
  widgetViewFactory: ReturnType<typeof useWidgetViewFactory>,
  addTopics: (payload: string[]) => string[]
) => {
  const widget = widgetViewFactory({
    as: "span",
    component: HeadingWidget,
  });

  return $prose(
    (ctx) =>
      new Plugin({
        state: {
          init() {
            return DecorationSet.empty;
          },
          apply(tr: Transaction) {
            const widgets: Decoration[] = [];

            tr.doc.descendants((node, pos) => {
              if (node.type === headingSchema.type(ctx)) {
                const widgetHeading = widget(pos + 1, {
                  id: node.attrs.id,
                  side: -1,
                });
                widgets.push(widgetHeading);

                const content = tr.doc.content as unknown as {
                  content: Node[];
                };

                const alwaysHeading = content.content
                  .filter((component) => component.type.name === "heading")
                  .map((component) => component.attrs.id);
                addTopics(alwaysHeading);
              }
            });

            return DecorationSet.create(tr.doc, widgets);
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
