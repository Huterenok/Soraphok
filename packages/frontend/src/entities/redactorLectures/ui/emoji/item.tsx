import { Ctx } from "@milkdown/ctx";
import { Instance } from "@milkdown/react";
import { clsx } from "clsx";
import { FC } from "react";
import { SharedProps } from "shared/config/type/shared";
import { itemEmoji, itemEmojiSelect } from "./menu.module.scss";

interface EmojiItemProps extends SharedProps {
  index: number;
  instance: Instance;
  onSelect: (ctx: Ctx) => void;
  selected: boolean;
  setSelected: (selected: number) => void;
}

export const EmojiMenuItem: FC<EmojiItemProps> = ({
  index,
  instance,
  onSelect,
  children,
  selected,
  setSelected,
}) => {
  const [loading, getEditor] = instance;

  return (
    <li
      className={clsx(itemEmoji, selected && itemEmojiSelect)}
      onMouseMove={() => setSelected(index)}
      onMouseDown={(e) => {
        if (loading) return;
        e.preventDefault();
        getEditor().action(onSelect);
      }}
    >
      {children}
    </li>
  );
};
