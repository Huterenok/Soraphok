import { Ctx } from "@milkdown/ctx";
import { Instance } from "@milkdown/react";
import { FC } from "react";
import { menuLi, menuLiImage } from "./menu.module.scss";
import Image, { StaticImageData } from "next/image";

type SlashItemProps = {
  index: number;
  instance: Instance;
  onSelect: (ctx: Ctx) => void;
  setSelected: (selected: number) => void;
  title: string;
  image: StaticImageData;
};

export const SlashItem: FC<SlashItemProps> = ({
  index,
  instance,
  onSelect,
  title,
  image,
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
      onMouseMove={() => setSelected(index)}
      onMouseDown={(e) => {
        e.preventDefault();
        onPick();
      }}
      className={menuLi}
    >
      <Image
        className={menuLiImage}
        width={46}
        height={46}
        src={image}
        alt="icon"
      />

      {title}
    </li>
  );
};
