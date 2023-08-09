import * as Popover from "@radix-ui/react-popover";
import menu from "./img/menu.svg";
import { FormLabel } from "./formLabel/formLabel";
import { openMenu, tooltipCommon } from "./modal.module.scss";
import Image from "next/image";

export interface attrsImage {
  src: string;
  alt: string;
  title: string;
}

interface ModalImageProps {
  onChange: (keyImage: string, value: string) => void;
  attrs: attrsImage;
}

export const ModalImage = ({ attrs, onChange }: ModalImageProps) => {
  const { src, alt, title } = attrs;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={openMenu} aria-label="Customise options">
          <Image src={menu} alt="menu" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className={tooltipCommon} sideOffset={5}>
          <FormLabel
            title="Link"
            defaultValue={src}
            onChange={onChange}
            keyImage="src"
          />
          <FormLabel
            title="Alt"
            defaultValue={alt}
            onChange={onChange}
            keyImage="alt"
          />
          <FormLabel
            title="Title"
            defaultValue={title}
            onChange={onChange}
            keyImage="title"
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
