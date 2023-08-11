import { useNodeViewContext } from "@prosemirror-adapter/react";
import Image from "next/image";
import { image, wrapperImage, resizeImg, titleImg } from "./Image.module.scss";
import { TooltipImage, attrsImage } from "./tooltip/tooltip";
// import { Rnd } from "react-rnd";

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
      {/* <Rnd
        default={{
          x: 0,
          y: 0,
          width: "100%",
          height: "100%",
        }}
        disableDragging
      >
        <div> */}
      <TooltipImage onChange={onChange} attrs={attrs as attrsImage} />
      <Image
        className={image}
        src={attrs.src}
        alt={attrs.alt}
        width={100}
        height={100}
        draggable={false}
      />

      <div className={resizeImg} />
      {/* </div>
      </Rnd> */}

      <p className={titleImg}>{attrs.title}</p>
    </div>
  );
};
