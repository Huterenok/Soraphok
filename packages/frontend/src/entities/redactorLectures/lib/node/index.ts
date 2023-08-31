import { $remark } from "@milkdown/utils";
import directive from "remark-directive";

export const remarkDirective = $remark(() => directive);

export { EmbeddedNode, inputEmbeddedRule } from "./embedded";

export { linkPlugin } from "./link";
export { NoteNode, inputNote, wrapInNoteCommand } from "./note";
export { tableTooltipCtx, tableTooltip, tableSelectorPlugin } from "./table";
export { VideoNode, inputVideoRule, createVideoCommand } from "./video";
