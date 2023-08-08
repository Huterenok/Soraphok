import { createContext, useContext } from "react";

export type ToastType = "success" | "fail" | "warning" | "info";

export type Show = (
  desc: string,
  type: ToastType,
  onConfirm?: () => void
) => void;
export const setShowCtx = createContext<Show>(() => {});

export const useToast = () => {
  return useContext(setShowCtx);
};
