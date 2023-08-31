import { $command, $inputRule, $node } from "@milkdown/utils";
import { Node } from "@milkdown/prose/model";
import { InputRule } from "@milkdown/prose/inputrules";
import { setBlockType } from "@milkdown/prose/commands";

const NamePlugin = "video";

export const VideoNode = $node(NamePlugin, () => ({
  group: "block",
  atom: true,
  isolating: true,
  marks: "",
  attrs: {
    src: { default: null },
  },
  parseDOM: [
    {
      tag: NamePlugin,
      getAttrs: (dom) => ({
        src: (dom as HTMLElement).getAttribute("src"),
      }),
    },
  ],
  toDOM: (node: Node) => [
    NamePlugin,
    { ...node.attrs, contenteditable: false },
    0,
  ],
  parseMarkdown: {
    match: (node) => node.type === "leafDirective" && node.name === NamePlugin,
    runner: (state, node, type) => {
      state.addNode(type, {
        src: (node.attributes as { src: string }).src,
      });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "NamePlugin",
    runner: (state, node) => {
      state.addNode("leafDirective", undefined, undefined, {
        name: "NamePlugin",
        attributes: { src: node.attrs.src },
      });
    },
  },
}));

export const inputVideoRule = $inputRule((ctx) => {
  return new InputRule(
    /::video\{src\="(?<src>[^"]+)?"?\}/,
    (state, match, start, end) => {
      const [okay, src = ""] = match;
      const { tr } = state;
      if (okay) {
        tr.replaceWith(start - 1, end, VideoNode.type(ctx).create({ src }));
      }

      return tr;
    }
  );
});

export const createVideoCommand = $command(
  "CreateCodeBlock",
  (ctx) =>
    (src = "") =>
      setBlockType(VideoNode.type(ctx), { src })
);
