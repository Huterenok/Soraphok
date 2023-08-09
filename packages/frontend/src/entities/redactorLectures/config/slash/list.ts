import { commandsCtx, editorViewCtx } from "@milkdown/core";
import { Ctx, MilkdownPlugin } from "@milkdown/ctx";
import { slashFactory } from "@milkdown/plugin-slash";
import {
  createCodeBlockCommand,
  insertHrCommand,
  insertImageCommand,
  wrapInBulletListCommand,
  wrapInHeadingCommand,
  wrapInOrderedListCommand,
  wrapInBlockquoteCommand,
} from "@milkdown/preset-commonmark";
import {
  h1,
  h2,
  h3,
  divider,
  code,
  table,
  image,
  bulleted_list,
  numbered_list,
  todo,
  blockquote,
} from "../../ui/slash";
import { StaticImageData } from "next/image";

import { insertTableCommand } from "@milkdown/preset-gfm";
import { StatusBlockquote } from "../blockquote";

type ConfigItem = {
  image: StaticImageData;
  title: string;
  onSelect: (ctx: Ctx) => void;
};

const removeSlash = (ctx: Ctx) => {
  // remove slash
  const view = ctx.get(editorViewCtx);
  view.dispatch(
    view.state.tr.delete(
      view.state.selection.from - 1,
      view.state.selection.from
    )
  );
};

export const slash = slashFactory("slashMenu") satisfies MilkdownPlugin[];

export const config: Array<ConfigItem> = [
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(wrapInHeadingCommand.key, 1),
    image: h1,
    title: "Large Heading",
  },
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(wrapInHeadingCommand.key, 2),
    image: h2,
    title: "Medium Heading",
  },
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(wrapInHeadingCommand.key, 3),
    image: h3,
    title: "Small Heading",
  },
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(createCodeBlockCommand.key),
    image: code,
    title: "Code Block",
  },
  {
    onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(insertTableCommand.key),
    image: table,
    title: "Table",
  },
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(wrapInBlockquoteCommand.key, {
        type: StatusBlockquote.INFO,
        title: "hello",
      }),
    image: blockquote,
    title: "Quote",
  },
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(wrapInBulletListCommand.key),
    image: bulleted_list,
    title: "Bulleted list",
  },
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(wrapInOrderedListCommand.key),
    image: numbered_list,
    title: "Numbered list",
  },
  // {
  //   onSelect: (ctx: Ctx) =>
  //     ctx.get(commandsCtx).call(wrapInBulletListCommand.key, {
  //       listType: "checked",
  //     }),
  //   image: todo,
  //   title: "To-do list",
  // },
  {
    onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(insertImageCommand.key),
    image: image,
    title: "Image",
  },
  {
    onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(insertHrCommand.key),
    image: divider,
    title: "Divider",
  },
].map((item) => ({
  ...item,
  onSelect: (ctx: Ctx) => {
    removeSlash(ctx);
    item.onSelect(ctx);
  },
}));
