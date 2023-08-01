import * as Toast from "@radix-ui/react-toast";
import clsx from "clsx";
import { Show, ToastType, setShowCtx } from "../../model";
import type { FC, ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [onConfirm, setOnConfirm] = useState<undefined | (() => void)>(
    undefined
  );
  const [type, setType] = useState<ToastType>("success");

  const show: Show = useCallback((desc, type, onConfirm) => {
    setDesc(desc);
    setType(type);
    setOpen(true);
    setOnConfirm(() => onConfirm);
  }, []);

  const icon = useMemo(() => {
    switch (type) {
      case "warning":
        return "report_problem";
      case "fail":
        return "error_outline";
      case "info":
        return "new_releases";
      case "success":
      default:
        return "check_circle_outline";
    }
  }, [type]);

  const iconColor = useMemo(() => {
    switch (type) {
      case "warning":
        return "text-nord13";
      case "fail":
        return "text-nord11";
      case "info":
        return "text-nord15";
      case "success":
      default:
        return "text-nord14";
    }
  }, [type]);

  return (
    <setShowCtx.Provider value={show}>
      <Toast.Provider swipeDirection="right">
        {children}
        <Toast.Root className="toast-root" open={open} onOpenChange={setOpen}>
          <Toast.Title className="toast-title">
            <span className={clsx("material-symbols-outlined", iconColor)}>
              {icon}
            </span>
            <span className="text-sm font-light">{desc}</span>
          </Toast.Title>
          <div className="flex">
            {onConfirm && (
              <Toast.Action
                className={clsx("rounded-full p-2")}
                asChild
                altText="Confirm toast."
                onClick={onConfirm}
              >
                <button className="material-symbols-outlined">done</button>
              </Toast.Action>
            )}
            <Toast.Action
              className={clsx("rounded-full p-2")}
              asChild
              altText="Close toast."
            >
              <button className="material-symbols-outlined">close</button>
            </Toast.Action>
          </div>
        </Toast.Root>
        <Toast.Viewport className="toast-viewport" />
      </Toast.Provider>
    </setShowCtx.Provider>
  );
};
