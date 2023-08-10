import { useNodeViewContext } from "@prosemirror-adapter/react";
import { useState } from "react";

import { blockquoteContainer, selectTypeButton } from "./Note.module.scss";
import * as status from "./Note.module.scss";
import { DropDown } from "shared/ui/DropDown";
import { StatusBlockquote } from "../../../config";
import info from "./img/info.svg";
import warning from "./img/warning.svg";
import success from "./img/success.svg";
import mistake from "./img/mistake.svg";
import clsx from "clsx";

export const Note = () => {
  const { contentRef, node } = useNodeViewContext();
  console.log(node.attrs);

  const [selectStatus, setStatus] = useState<StatusBlockquote>(
    StatusBlockquote.INFO
  );
  let iconMenu = info;
  if (selectStatus === StatusBlockquote.WARNING) {
    iconMenu = warning;
  } else if (selectStatus === StatusBlockquote.MISTAKE) {
    iconMenu = mistake;
  } else {
    iconMenu = success;
  }

  return (
    <div
      className={clsx(blockquoteContainer, status[selectStatus])}
      ref={contentRef}
    >
      <DropDown
        iconMenu={iconMenu}
        buttonSelectClass={selectTypeButton}
        selectElement={selectStatus}
        elemets={Object.values(StatusBlockquote)}
        onChangeElemet={(newElement: string) => () => {
          setStatus(newElement as StatusBlockquote);
        }}
      />
    </div>
  );
};
