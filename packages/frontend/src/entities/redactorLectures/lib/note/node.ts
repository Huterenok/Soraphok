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
    type: { default: "Info" },
    title: { default: "" },
    text: { default: "" },
  },
  parseDOM: [
    {
      tag: "section",
      getAttrs: (dom) => ({
        type: (dom as HTMLElement).getAttribute("type"),
        title: (dom as HTMLElement).getAttribute("title"),
        text: (dom as HTMLElement).getAttribute("text"),
      }),
    },
  ],
  toDOM: (node: Node) => [
    "section",
    { ...node.attrs, contenteditable: true },
    0,
  ],
  parseMarkdown: {
    match: (node) => node.type === "leafDirective" && node.name === "note",
    runner: (state, node, type) => {
      state.addNode(type, {
        type: (node.attributes as { type: string }).type,
        title: (node.attributes as { title: string }).title,
        text: (node.attributes as { text: string }).text,
      });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "note",
    runner: (state, node) => {
      state.addNode("leafDirective", undefined, undefined || "", {
        name: "note",
        attributes: {
          type: node.attrs.type,
          title: node.attrs.title,
          text: node.attrs.text,
        },
      });
    },
  },
}));

export const inputNote = $inputRule((ctx) => {
  return new InputRule(
    /::note\{type="(Info|Warning|Mistake|Success)" title\="(?<title>[^"]+)?"? text\="(?<text>[^"]+)?"?\}/,
    (state, match, start, end) => {
      const [okay, type, title, text] = match;
      const { tr } = state;

      if (okay) {
				let noteNode = NoteNode.type(ctx).create({ type, title, text });
				console.log(noteNode)
        tr.replaceWith(
          start - 1,
          end,
          noteNode
        );
      }

      return tr;
    }
  );
});
