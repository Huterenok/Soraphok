import { $inputRule, $node, $remark } from "@milkdown/utils";
import directive from "remark-directive";
import { Node } from "@milkdown/prose/model";
import { InputRule } from "@milkdown/prose/inputrules";

export const remarkDirectiveIframe = $remark(() => directive);
export const IframeNode = $node("iframe", () => ({
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
      }),
    },
  ],

  toDOM: (node: Node) => [
    "iframe",
    { ...node.attrs, contenteditable: false },
    0,
  ],
  parseMarkdown: {
    match: (node) => node.type === "leafDirective" && node.name === "iframe",
    runner: (state, node, type) => {
      state.addNode(type, { src: (node.attributes as { src: string }).src });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "iframe",
    runner: (state, node) => {
      state.addNode("leafDirective", undefined, undefined, {
        name: "iframe",
        attributes: { src: node.attrs.src },
      });
    },
  },
}));

export const inputIframeRule = $inputRule(
  () =>
    new InputRule(
      /::iframe\{src\="(?<src>[^"]+)?"?\}/,
      (state, match, start, end) => {
        const [okay, src = ""] = match;
        const { tr } = state;
        if (okay) {
          console.log(remarkDirectiveIframe);
          // tr.replaceWith(start - 1, end, remarkDirectiveIframe.type().create({ src }));
        }

        return tr;
      }
    )
);
