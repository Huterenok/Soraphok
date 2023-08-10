import {
  $inputRule,
  $inputRuleAsync,
  $node,
  $nodeSchema,
  $remark,
} from "@milkdown/utils";
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
    width: { default: "300" },
  },
  parseDOM: [
    {
      tag: "iframe",
      getAttrs: (dom) => ({
        src: (dom as HTMLElement).getAttribute("src"),
        width: (dom as HTMLElement).getAttribute("width"),
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
      state.addNode(type, {
        src: (node.attributes as { src: string }).src,
        width: (node.attributes as { width: string }).width,
      });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "iframe",
    runner: (state, node) => {
      state.addNode("leafDirective", undefined, undefined, {
        name: "iframe",
        attributes: { src: node.attrs.src, width: node.attrs.width },
      });
    },
  },
}));

export const inputIframeRule = $inputRule((ctx) => {
  return new InputRule(
    /::iframe\{src\="(?<src>[^"]+)?"?\}/,
    (state, match, start, end) => {
      const [okay, src = ""] = match;
      const { tr } = state;
      if (okay) {
        tr.replaceWith(
          start - 1,
          end,
          IframeNode.type(ctx).create({ src })
        );
      }

      return tr;
    }
  );
});
