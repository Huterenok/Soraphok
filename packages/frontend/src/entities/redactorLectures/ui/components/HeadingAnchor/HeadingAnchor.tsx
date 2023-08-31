import { useWidgetViewContext } from "@prosemirror-adapter/react";
import { linkAnchor } from "./HeadingAnchor.module.scss";
import { Fragment } from "react";

export const HeadingWidget = () => {
  const { spec } = useWidgetViewContext();
  const id: string = spec?.id ?? "";
  const level: number = spec?.level ?? 0;

  return (
    <a className={linkAnchor} href={`#${id}`}>
      {Array.from(Array(level).keys()).map((key) => (
        <Fragment key={key}>#</Fragment>
      ))}
    </a>
  );
};
