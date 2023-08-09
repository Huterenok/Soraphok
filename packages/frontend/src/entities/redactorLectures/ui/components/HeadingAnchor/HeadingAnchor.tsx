import { useWidgetViewContext } from "@prosemirror-adapter/react";
import { linkAnchor } from "./HeadingAnchor.module.scss";

export const HeadingWidget = () => {
  const { spec } = useWidgetViewContext();
  const id: string = spec?.id ?? "";

  return (
    <a className={linkAnchor} href={`#${id}`}>
      #
    </a>
  );
};
