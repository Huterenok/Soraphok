import { ToggleItem as ToggleItemToolbar } from "@radix-ui/react-toolbar";
import {
  bubbleItem,
  descriptionItem,
  descriptionKeybord,
} from "./BubbleItem.module.scss";
import { $Command, callCommand } from "@milkdown/utils";
import { MouseEvent, useCallback } from "react";
import { Ctx } from "@milkdown/ctx";
import { useInstance } from "@milkdown/react";
import Image, { StaticImageData } from "next/image";
import { Tooltip } from "shared/ui/Tooltip";
import { Hotkeys } from "shared/ui/Hotkeys";

interface BubbleItemProps {
  value: string;
  text?: string;
  image?: StaticImageData;
  commad: $Command<any>;
  commadArgs?: any;
  description: string;
  descriptionKeyBoard?: string;
  selectionMarks: string[];
}

export const BubbleItem = ({
  value,
  text,
  image,
  commad,
  commadArgs,
  description,
  descriptionKeyBoard,
  selectionMarks,
}: BubbleItemProps) => {
  const [loading, get] = useInstance();
  const isSelect = selectionMarks.includes(value);

  const action = useCallback(
    (event: MouseEvent, fn: (ctx: Ctx) => void) => {
      if (loading) return;
      event.preventDefault();

      get().action(fn);
    },
    [loading, get]
  );

  return (
    <Tooltip
      trigger={
        <ToggleItemToolbar
          value={value}
          className={bubbleItem}
          onMouseDown={(e) => action(e, callCommand(commad.key, commadArgs))}
          // onClick={}
          aria-pressed={isSelect}
        >
          {text}
          {image && <Image src={image} alt="command" />}
        </ToggleItemToolbar>
      }
      content={
        <div className={descriptionItem}>
          <p>{description}</p>
          {descriptionKeyBoard && (
            <p className={descriptionKeybord}>
              Hotkeys: <Hotkeys>{descriptionKeyBoard}</Hotkeys>
            </p>
          )}
        </div>
      }
      contentClassname=""
    />
  );
};
