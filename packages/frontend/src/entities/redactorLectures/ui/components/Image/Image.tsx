import { useNodeViewContext } from "@prosemirror-adapter/react";
import Image from "next/image";
import { image, wrapperImage, resizeImg, titleImg } from "./Image.module.scss";
import { ModalImage, attrsImage } from "./modal/modal";

export const ImageMarkdown = () => {
  const { node, setAttrs } = useNodeViewContext();
  const { attrs } = node;

  const onChange = (keyImage: string, value: string) => {
    if (value === node?.attrs[keyImage]) return;

    setAttrs({
      [keyImage]: value,
    });
  };

  return (
    <div className={wrapperImage}>
      <ModalImage onChange={onChange} attrs={attrs as attrsImage} />
      <Image
        className={image}
        src={attrs.src}
        alt={attrs.alt}
        width={100}
        height={100}
        draggable={false}
      />

      <div className={resizeImg} />

      <p className={titleImg}>{attrs.title}</p>
    </div>
  );
};
