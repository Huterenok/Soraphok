import { commandsCtx } from "@milkdown/core";
import { $command, $mark, $markAttr, $useKeymap } from "@milkdown/utils";
import { toggleMark } from "@milkdown/prose/commands";
import { headingSchema, paragraphSchema } from "@milkdown/preset-commonmark";
import { Plugin, Transaction } from "@milkdown/prose/state";
import { Decoration } from "@milkdown/prose/view";
import { DecorationSet } from "@milkdown/prose/view";
import { $prose } from "@milkdown/utils";
import type { useWidgetViewFactory } from "@prosemirror-adapter/react";
import { HeadingWidget } from "../../ui";

export const underlineAttr = $markAttr("underlineMark");

export const underlineSchema = $mark("underlineMark", (ctx) => ({
  attrs: {
    marker: {
      default: "-",
    },
  },
  parseDOM: [{ tag: "u" }],
  toDOM: () => ["u"],
  parseMarkdown: {
    match: (node) => node.type === "underlineMark",
    runner: (state, node, markType) => {
      state.openMark(markType, { marker: node.marker });
      state.next(node.children);
      state.closeMark(markType);
    },
  },
  toMarkdown: {
    match: (mark) => mark.type.name === "underlineMark",
    runner: (state, mark) => {
      state.withMark(mark, "underlineMark", undefined, {
        marker: mark.attrs.marker,
      });
    },
  },
}));

export const toggleUnderlineCommand = $command(
  "ToggleUnderline",
  (ctx) => () => {
    return toggleMark(underlineSchema.type(ctx));
  }
);

export const underlineKeymap = $useKeymap("underlineKeymap", {
  ToggleUnderline: {
    shortcuts: "Mod-u",
    command: (ctx) => {
      const commands = ctx.get(commandsCtx);
      return () => commands.call(toggleUnderlineCommand.key);
    },
  },
});

// export const useUnderlineMark = (
//   widgetViewFactory: ReturnType<typeof useWidgetViewFactory>
// ) => {
//   return $prose(
//     (ctx) =>
//       new Plugin({
//         props: {
//           decorations(state) {
//             const widgets: Decoration[] = [];

//             state.doc.descendants((node, pos) => {
//               if (node.type === paragraphSchema.type(ctx)) {
//                 const widget = Decoration.node(pos, pos + node.nodeSize, {
//                   // style: "text-align: center",
//                 });
//                 widgets.push(widget);
//               }
//             });

//             return DecorationSet.create(state.doc, widgets);
//           },
//         },
//       })
//   );
// };
