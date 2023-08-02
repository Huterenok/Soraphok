import { Ctx } from "@milkdown/ctx";
import { Instance } from "@milkdown/react";
import { clsx } from "clsx";
import { FC } from "react";

type SlashItemProps = {
  index: number;
  instance: Instance;
  onSelect: (ctx: Ctx) => void;
  selected: boolean;
  setSelected: (selected: number) => void;
  title: string;
  image: string;
};

export const SlashItem: FC<SlashItemProps> = ({
  index,
  instance,
  onSelect,
  title,
  image,
  selected,
  setSelected,
}) => {
  const [loading, getEditor] = instance;

  const onPick = () => {
    if (loading) return;

    getEditor().action((ctx) => {
      onSelect(ctx);
    });
  };

  return (
    <li
      className={clsx(
        "cursor-pointer px-6 py-3",
        selected && "bg-gray-200 dark:bg-gray-700"
      )}
      onMouseMove={() => setSelected(index)}
      onMouseDown={(e) => {
        e.preventDefault();
        onPick();
      }}
    >
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-nord-10 dark:text-nord-9">
          {image}
        </span>

        {title}
      </div>
      {/* {children} */}
    </li>
  );
};
