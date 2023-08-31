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
  blockquote,
} from "../../ui/slash";
import { StaticImageData } from "next/image";
import { wrapInNoteCommand } from "../../lib";

import { insertTableCommand } from "@milkdown/preset-gfm";
import { StatusNote } from "..";

const removeSlash = (ctx: Ctx) => {
  const view = ctx.get(editorViewCtx);
  view.dispatch(
    view.state.tr.delete(
      view.state.selection.from - 1,
      view.state.selection.from
    )
  );
};

export const slash = slashFactory("slashMenu") satisfies MilkdownPlugin[];

const transformSelect = (list: ConfigItem[]) => {
  return list.map((item) => ({
    ...item,
    onSelect: (ctx: Ctx) => {
      removeSlash(ctx);
      item.onSelect(ctx);
    },
  }));
};

interface ConfigItem {
  image: StaticImageData;
  title: string;
  description: string;
  onSelect: (ctx: Ctx) => void;
}

export enum CategoriesComponents {
  ALL = "All",
  TEXT = "Text",
  LIST = "List",
  MEDIA = "Media",
  BLOCKS = "Blocks",
  EMBEDS = "Embeds",
}

const TextComponets = transformSelect([
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(wrapInHeadingCommand.key, 1),
    image: h1,
    description: "",
    title: "Large Heading",
  },
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(wrapInHeadingCommand.key, 2),
    image: h2,
    description: "",
    title: "Medium Heading",
  },
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(wrapInHeadingCommand.key, 3),
    image: h3,
    description: "",
    title: "Small Heading",
  },
  {
    onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(insertHrCommand.key),
    image: divider,
    description: "",
    title: "Divider",
  },
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(wrapInBlockquoteCommand.key),
    image: blockquote,
    description: "",
    title: "Quote",
  },
  // {
  //   onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(wrapInNoteCommand.key),
  //   image: blockquote,
  //   description: "",
  //   title: "Note Info",
  // },
]);

const BlocksComponets = transformSelect([
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(createCodeBlockCommand.key),
    image: code,
    description: "",
    title: "Code Block",
  },
  {
    onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(insertTableCommand.key),
    image: table,
    description: "",
    title: "Table",
  },
]);

const ListComponets = transformSelect([
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(wrapInBulletListCommand.key),
    image: bulleted_list,
    description: "",
    title: "Bulleted list",
  },
  {
    onSelect: (ctx: Ctx) =>
      ctx.get(commandsCtx).call(wrapInOrderedListCommand.key),
    image: numbered_list,
    description: "",
    title: "Numbered list",
  },
  // {
  //   onSelect: (ctx: Ctx) =>
  //     ctx.get(commandsCtx).call(wrapInOrderedListCommand.key),
  //   image: numbered_list,
  //   description: "",
  //   title: "Todo list",
  // },
]);

const MediaComponets = transformSelect([
  {
    onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(insertImageCommand.key),
    image: image,
    description: "",
    title: "Image",
  },
]);

const EmbedsComponets: ConfigItem[] = transformSelect([]);

export const config: Record<CategoriesComponents, ConfigItem[]> = {
  [CategoriesComponents.TEXT]: TextComponets,
  [CategoriesComponents.BLOCKS]: BlocksComponets,
  [CategoriesComponents.LIST]: ListComponets,
  [CategoriesComponents.MEDIA]: MediaComponets,
  [CategoriesComponents.EMBEDS]: EmbedsComponets,
  [CategoriesComponents.ALL]: [
    ...TextComponets,
    ...BlocksComponets,
    ...ListComponets,
    ...MediaComponets,
    ...EmbedsComponets,
  ],
};

// {
//   onSelect: (ctx: Ctx) =>
//     ctx.get(commandsCtx).call(extendListItemSchemaForTask.key, {
//       listType: "checked",
//     }),
//   image: todo,
// 	description:"",
//   title: "To-do list",
// },
