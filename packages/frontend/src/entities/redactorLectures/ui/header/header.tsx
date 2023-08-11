import Image, { StaticImageData } from "next/image";
import {
  coverBackground,
  headerLesson,
  selectCover,
  wrapperCover,
  avatarBody,
  avatar,
  changeCoverBody,
} from "./header.module.scss";
import cover from "./img/cosmocCover.jpeg";
import avatarImg from "./img/avatar.png";
import {
  Popover as PopoverRoot,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { TooltipFile } from "../components";
import { DragEvent, useState } from "react";

export const HeaderLesson = () => {
  const [srcCover, setSrcCover] = useState<string | StaticImageData>(cover);
  const [isDragCover, setIsDragOver] = useState(false);
  const [positionCover, setPositionCover] = useState(50);

  return (
    <PopoverRoot>
      <div className={headerLesson}>
        <div className={wrapperCover}>
          <div
            className={coverBackground}
            style={{
              backgroundImage: `url(${
                typeof srcCover === "string" ? srcCover : srcCover.src
              })`,
              backgroundPosition: `center ${positionCover}%`,
            }}
            draggable={false}
            onMouseDown={() => {
              setIsDragOver(true);
            }}
            onMouseUp={() => {
              setIsDragOver(false);
            }}
            onMouseMove={(event: any) => {
              if (!isDragCover) return;
              const positionCoverY = event.clientY / 7;
              setPositionCover(positionCoverY);
            }}
          />

          {/* <Image
            src={srcCover}
            alt="cover"
            style={{}}
            onDragStart={() => false}
          /> */}

          <div className={changeCoverBody}>
            <PopoverTrigger asChild>
              <button className={selectCover} aria-label="Update dimensions">
                📄 Add cover
              </button>
            </PopoverTrigger>

            <button className={selectCover}>📄 Change cover</button>
          </div>
        </div>

        <div className={avatarBody}>
          <Image className={avatar} src={avatarImg} alt="avatar" />
        </div>
      </div>

      <TooltipFile changeValue={setSrcCover} />
    </PopoverRoot>
  );
};
