import { $command, $inputRule, $node } from "@milkdown/utils";
import { Node } from "@milkdown/prose/model";
import { InputRule } from "@milkdown/prose/inputrules";
import { wrapIn } from "@milkdown/prose/commands";
import { StatusNote } from "../../../config";

export const NoteNode = $node("note", (ctx) => ({
  group: "block",
  content: "text*",
  atom: true,
  isolating: true,
  attrs: {
    type: { default: "Info" },
    title: { default: "" },
  },
  parseDOM: [
    {
      tag: "section",
      getAttrs: (dom) => ({
        type: (dom as HTMLElement).getAttribute("type"),
        title: (dom as HTMLElement).getAttribute("title"),
      }),
    },
  ],
  toDOM: (node: Node) => ["section", { ...node.attrs }, 0],
  parseMarkdown: {
    match: (node) => node.name === "note",
    runner: (state, node, type) => {
      const value = node.value as string;

      state.openNode(type, {
        type: (node.attributes as { type: string }).type,
        title: (node.attributes as { title: string }).title,
      });

      if (value) state.addText(value);

      state.closeNode();
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "note",
    runner: (state, node) => {
      state.openNode("leafDirective").next(node.content).closeNode();
    },
  },
}));

export const inputNote = $inputRule((ctx) => {
  return new InputRule(
    /^::note\{type="(Info|Warning|Mistake|Success)" title\="(?<title>[^"]+)?"?\}$/,
    (state, match, start, end) => {
      const [okay, type, title] = match;
      const { tr } = state;

      if (okay) {
				let noteNode = NoteNode.type(ctx).create({ type, title });
				console.log(noteNode)
        tr.replaceWith(
          start - 1,
          end,
          NoteNode.type(ctx).create({ type, title })
        );
      }

      return tr;
    }
  );
});

// interface wrapInNoteCommandProps {
//   type: StatusNote;
//   title: string;
// }

export const wrapInNoteCommand = $command(
  "WrapInNote",
  (ctx) => () => wrapIn(NoteNode.type(ctx))
);
