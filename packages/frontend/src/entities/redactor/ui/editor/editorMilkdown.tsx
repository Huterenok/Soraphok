// import type { CmdKey } from "@milkdown/core";
import { editorViewCtx, parserCtx } from "@milkdown/core";
// import { redoCommand, undoCommand } from "@milkdown/plugin-history";
// import {
//   toggleEmphasisCommand,
//   toggleStrongCommand,
//   wrapInBlockquoteCommand,
//   wrapInBulletListCommand,
//   wrapInOrderedListCommand,
// } from "@milkdown/preset-commonmark";
// import {
//   insertTableCommand,
//   toggleStrikethroughCommand,
// } from "@milkdown/preset-gfm";
import { Slice } from "@milkdown/prose/model";
import { Milkdown as Editor } from "@milkdown/react";
// import { callCommand } from "@milkdown/utils";
import type { FC, RefObject } from "react";
import { useImperativeHandle } from "react";
import { usePlayground } from "../../model";
import { BodyEditor } from "./editorMilkdown.style";

// const Button: FC<{ icon: string; onClick?: () => void }> = ({
//   icon,
//   onClick,
// }) => {
//   return (
//     <div
//       className={clsx(
//         "flex h-10 w-10 cursor-pointer items-center justify-center rounded"
//       )}
//       onMouseDown={(e) => {
//         onClick?.();
//         e.preventDefault();
//       }}
//     >
//       <span className="material-symbols-outlined !text-base">{icon}</span>
//     </div>
//   );
// };

interface MilkdownProps {
  content: string;
  onChange: (markdown: string) => void;
  milkdownRef: RefObject<MilkdownRef>;
}

export interface MilkdownRef {
  update: (markdown: string) => void;
}

export const EditorMilkdown: FC<MilkdownProps> = ({
  content,
  onChange,
  milkdownRef,
}) => {
  const { loading, get } = usePlayground(content, onChange);

  useImperativeHandle(milkdownRef, () => ({
    update: (markdown: string) => {
      if (loading) return;
      const editor = get();
      editor?.action((ctx) => {
        const view = ctx.get(editorViewCtx);
        const parser = ctx.get(parserCtx);
        const doc = parser(markdown);
        if (!doc) return;
        const state = view.state;
        view.dispatch(
          state.tr.replace(
            0,
            state.doc.content.size,
            new Slice(doc.content, 0, 0)
          )
        );
      });
    },
  }));

  // function call<T>(command: CmdKey<T>, payload?: T) {
  //   return get()?.action(callCommand(command, payload));
  // }

  return (
    <BodyEditor>
      <Editor />
			
      {/* <div className="absolute top-0 h-10 w-full border-b border-nord4 dark:divide-gray-600 dark:border-gray-600">
        <div className="prose mx-auto flex">
          <Button icon="undo" onClick={() => call(undoCommand.key)} />
          <Button icon="redo" onClick={() => call(redoCommand.key)} />
          <Button
            icon="format_bold"
            onClick={() => call(toggleStrongCommand.key)}
          />
          <Button
            icon="format_italic"
            onClick={() => call(toggleEmphasisCommand.key)}
          />
          <Button
            icon="format_strikethrough"
            onClick={() => call(toggleStrikethroughCommand.key)}
          />
          <Button icon="table" onClick={() => call(insertTableCommand.key)} />
          <Button
            icon="format_list_bulleted"
            onClick={() => call(wrapInBulletListCommand.key)}
          />
          <Button
            icon="format_list_numbered"
            onClick={() => call(wrapInOrderedListCommand.key)}
          />
          <Button
            icon="format_quote"
            onClick={() => call(wrapInBlockquoteCommand.key)}
          />
        </div>

        <div />
      </div> */}
    </BodyEditor>
  );
};
