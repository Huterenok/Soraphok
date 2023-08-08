import { Milkdown as Editor } from "@milkdown/react";
import type { FC } from "react";
import { BodyEditor } from "./editorCourse.module.scss";
import "./editor.scss";
import { useRefUpdateRedactor, InitRedactorProps } from "../lib";

export const RedactorCourse: FC<InitRedactorProps> = (props) => {
  useRefUpdateRedactor(props);

  return (
    <div className={BodyEditor}>
      <Editor />
    </div>
  );
};

// NAVBAR CREATE COMPONENTS



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

// function call<T>(command: CmdKey<T>, payload?: T) {
//   return get()?.action(callCommand(command, payload));
// }
{
  /* <div className="absolute top-0 h-10 w-full border-b border-nord4 dark:divide-gray-600 dark:border-gray-600">
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
      </div> */
}
