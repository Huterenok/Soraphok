import { useNodeViewContext } from "@prosemirror-adapter/react";
import {
  liContainer,
  liType,
  liContent,
  liNumber,
  liBullet,
} from "./ListItem.module.scss";

export const ListItem = () => {
  const { contentRef, node, setAttrs } = useNodeViewContext();
  const { attrs } = node;
  const checked = attrs?.checked;
  const isBullet = attrs?.listType === "bullet";

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
