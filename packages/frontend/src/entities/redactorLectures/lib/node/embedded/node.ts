import { $inputRule, $node } from "@milkdown/utils";
import { Node } from "@milkdown/prose/model";
import { InputRule } from "@milkdown/prose/inputrules";

export const EmbeddedNode = $node("embedded", () => ({
  group: "block",
  atom: true,
  isolating: true,
  marks: "",
  attrs: {
    src: { default: null },
  },
  parseDOM: [
    {
      tag: "iframe",
      getAttrs: (dom) => ({
        src: (dom as HTMLElement).getAttribute("src"),
        // width: (dom as HTMLElement).getAttribute("width"),
      }),
    },
  ],
  toDOM: (node: Node) => [
    "iframe",
    { ...node.attrs, contenteditable: false },
    0,
  ],
  parseMarkdown: {
    match: (node) => node.type === "leafDirective" && node.name === "embedded",
    runner: (state, node, type) => {
      state.addNode(type, {
        src: (node.attributes as { src: string }).src,
        // width: (node.attributes as { width: string }).width,
      });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "embedded",
    runner: (state, node) => {
      state.addNode("leafDirective", undefined, undefined, {
        name: "embedded",
        attributes: { src: node.attrs.src },
      });
    },
  },
}));

export const inputEmbeddedRule = $inputRule((ctx) => {
  return new InputRule(
    /::embedded\{src\="(?<src>[^"]+)?"?\}/,
    (state, match, start, end) => {
      const [okay, src = ""] = match;
      const { tr } = state;
      if (okay) {
        tr.replaceWith(start - 1, end, EmbeddedNode.type(ctx).create({ src }));
      }

      return tr;
    }
  );
});
