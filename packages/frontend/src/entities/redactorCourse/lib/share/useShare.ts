import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

export type Share = () => void;
export const shareCtx = createContext<Share>(() => {});
export const setShareCtx = createContext<Dispatch<SetStateAction<Share>>>(
  () => {}
);

export const useShare = () => useContext(shareCtx);

export const useSetShare = () => useContext(setShareCtx);
