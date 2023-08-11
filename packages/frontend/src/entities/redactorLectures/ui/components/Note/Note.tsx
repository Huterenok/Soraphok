import { useNodeViewContext } from "@prosemirror-adapter/react";
import { ChangeEvent, useCallback, useState } from "react";

import {
  blockquoteContainer,
  selectTypeButton,
  inputText,
} from "./Note.module.scss";
import * as status from "./Note.module.scss";
import { DropDown } from "shared/ui/DropDown";
import { StatusBlockquote } from "../../../config";
import info from "./img/info.svg";
import warning from "./img/warning.svg";
import success from "./img/success.svg";
import mistake from "./img/mistake.svg";
import clsx from "clsx";

export const Note = () => {
  const { node, setAttrs } = useNodeViewContext();
  const { type, title, text } = node.attrs;
  const [textLocal, setTextLocal] = useState("");

  let iconMenu = info;
  if (type === StatusBlockquote.WARNING) {
    iconMenu = warning;
  } else if (type === StatusBlockquote.MISTAKE) {
    iconMenu = mistake;
  } else {
    iconMenu = success;
  }

  const onChangeText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => () => {
      const { value } = event.target;
      console.log(value);
      // setAttrs({
      //   text: value,
      //   type,
      //   title,
      // });
      setTextLocal(value);
    },
    [setAttrs, title, type]
  );

  return (
    <div
      className={clsx(blockquoteContainer, status[type as StatusBlockquote])}
    >
      <DropDown
        iconMenu={iconMenu}
        buttonSelectClass={selectTypeButton}
        selectElement={type}
        elemets={Object.values(StatusBlockquote)}
        onChangeElemet={(newElement: string) => () => {
          setAttrs({
            type: newElement,
            title,
            text,
          });
        }}
      />

      <input
        className={inputText}
        value={textLocal}
        onChange={(event) => console.log(event.target.value)}
      />
    </div>
  );
};
