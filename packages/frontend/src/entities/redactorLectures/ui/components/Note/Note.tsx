import { useNodeViewContext } from "@prosemirror-adapter/react";
import { ChangeEvent, useCallback, useState } from "react";

import {
  blockquoteContainer,
  selectTypeButton,
  inputText,
} from "./Note.module.scss";
import * as status from "./Note.module.scss";
import { DropDown } from "shared/ui/DropDown";
import { StatusNote } from "../../../config";
import info from "./img/info.svg";
import warning from "./img/warning.svg";
import success from "./img/success.svg";
import mistake from "./img/mistake.svg";
import clsx from "clsx";

export const Note = () => {
  const { node, setAttrs, contentRef } = useNodeViewContext();
  const { type, title } = node.attrs;

  let iconMenu = info;
  if (type === StatusNote.WARNING) {
    iconMenu = warning;
  } else if (type === StatusNote.MISTAKE) {
    iconMenu = mistake;
  } else {
    iconMenu = success;
  }

  // const onChangeText = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => () => {
  //     const { value } = event.target;
  //     console.log(value);
  //     // setAttrs({
  //     //   text: value,
  //     //   type,
  //     //   title,
  //     // });
  //     setTextLocal(value);
  //   },
  //   [setAttrs, title, type]
  // );

  return (
    <div
      className={clsx(blockquoteContainer, status[type as StatusNote])}
    >
      <DropDown
        iconMenu={iconMenu}
        buttonSelectClass={selectTypeButton}
        selectElement={type}
        elemets={Object.values(StatusNote)}
        onChangeElemet={(newElement: string) => () => {
          setAttrs({
            type: newElement,
            title,
          });
          console.log("drop down menu");
        }}
      />

      {/* <input
        className={inputText}
        value={textLocal}
        onChange={(event) => console.log(event.target.value)}
      /> */}
      <p className={inputText} ref={contentRef} />
    </div>
  );
};
