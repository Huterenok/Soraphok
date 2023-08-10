import { $inputRule, $node, $remark } from "@milkdown/utils";
import directive from "remark-directive";
import { Node } from "@milkdown/prose/model";
import { InputRule } from "@milkdown/prose/inputrules";

export const remarkDirectiveNote = $remark(() => directive);

export const NoteNode = $node("note", (ctx) => ({
  group: "block",
  atom: true,
  isolating: true,
  marks: "",
  attrs: {
    type: { default: "Information" },
  },
  parseDOM: [
    {
      tag: "section",
      getAttrs: (dom) => ({
        type: (dom as HTMLElement).getAttribute("type"),
      }),
    },
  ],
  toDOM: (node: Node) => [
    "section",
    { ...node.attrs, contenteditable: false },
    0,
  ],
  parseMarkdown: {
    match: (node) => node.type === "leafDirective" && node.name === "note",
    runner: (state, node, type) => {
      state.addNode(type, { type: (node.attributes as { type: string }).type });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "note",
    runner: (state, node) => {
      state.addNode("leafDirective", undefined, undefined, {
        name: "note",
        attributes: { type: node.attrs.type },
      });
    },
  },
}));

export const inputNote = $inputRule((ctx) => {
  return new InputRule(
    /::note\{type\="(?<type>[^"]+)?"?\}/,
    (state, match, start, end) => {
      const [okay, type] = match;
      const { tr } = state;

      if (okay) {
        tr.replaceWith(start - 1, end, NoteNode.type(ctx).create({ type }));
      }

      return tr;
    }
  );
});
