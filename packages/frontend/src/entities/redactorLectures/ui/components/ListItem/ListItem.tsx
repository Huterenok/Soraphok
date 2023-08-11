import { useNodeViewContext } from "@prosemirror-adapter/react";
import { useMemo, type FC, useEffect } from "react";
import {
  liContainer,
  liType,
  liContent,
  liNumber,
  liBullet,
} from "./ListItem.module.scss";

export const ListItem: FC = () => {
  const {
    contentRef,
    node,
    setAttrs,
    view: { state },
  } = useNodeViewContext();
  const { attrs } = node;
  const checked = attrs?.checked;
  const isBullet = attrs?.listType === "bullet";

  // useEffect(() => {
  //   const { selection, doc } = state;

  //   const { from, to } = selection;
  //   console.log(selection);
  //   const text = doc.textBetween(from, to) || "";

  //   console.log(text);
  // }, [state]);

  return (
    <li className={liContainer}>
      <span className={liType}>
        {checked != null ? (
          <input
            className="form-checkbox rounded"
            onChange={() => setAttrs({ checked: !checked })}
            type="checkbox"
            checked={checked}
          />
        ) : isBullet ? (
          <span className={liBullet} />
        ) : (
          <span className={liNumber}>{attrs?.label}</span>
        )}
      </span>
      <div className={liContent} ref={contentRef} />
    </li>
  );
};
