import clsx from "clsx";
import { SharedProps } from "shared/config/type";
import { hotkeyClass } from "./Hotkeys.module.scss";

export const Hotkeys = ({ children, className }: SharedProps) => {
  const mod = navigator.appVersion.includes("Mac") ? "Cmd" : "Ctrl";

  return (
    <span className={clsx(className, hotkeyClass)}>
      {children?.toString().replace(/mod/gi, mod)}
    </span>
  );
};
