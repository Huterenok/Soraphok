import {
  coverBackground,
  selectCover,
  wrapperCover,
  changeCoverBody,
} from "./Cover.module.scss";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useState } from "react";
import { useUnit } from "effector-react";
import { $coverStore } from "entities/redactorLectures/model";

export const Cover = () => {
  const srcCover = useUnit($coverStore);
  const [isReposition, setIsReposition] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [oldPosition, setOldPosition] = useState(0);
  const [mouseDirection, setMouseDirection] = useState(16.67);

  const styleImg = {
    backgroundImage: `url(${srcCover})`,
    backgroundPosition: `center ${mouseDirection * 3}%`,
    cursor: isDown && isReposition ? "move" : "",
  };
  const styleBtns = {
    display: isDown && isReposition ? "none" : "flex",
  };

  const changeBackgroundPosition = (event: any) => {
    if (!isReposition || !isDown) return;

    if (event.pageY < oldPosition) {
      setMouseDirection(mouseDirection - 1);
    } else if (event.pageY > oldPosition) {
      setMouseDirection(mouseDirection + 1);
    }

    setOldPosition(event.pageY);
    console.log(mouseDirection);
  };

  return (
    <div className={wrapperCover}>
      {srcCover && (
        <div
          className={coverBackground}
          style={styleImg}
          draggable={false}
          onMouseMove={(event) => changeBackgroundPosition(event)}
          onMouseDown={() => setIsDown(true)}
          onMouseUp={() => setIsDown(false)}
          onMouseOver={() => setIsDown(false)}
        />
      )}

      <div className={changeCoverBody} style={styleBtns}>
        <PopoverTrigger asChild>
          <button className={selectCover} aria-label="Update dimensions">
            📄 Change cover
          </button>
        </PopoverTrigger>

        <button
          className={selectCover}
          onClick={() => setIsReposition(!isReposition)}
        >
          {isReposition ? "Save cover" : "Position cover"}
        </button>
      </div>
    </div>
  );
};
