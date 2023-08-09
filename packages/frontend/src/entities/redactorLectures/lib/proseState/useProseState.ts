import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

export type Json = Record<string, any>;

export const proseStateCtx = createContext<Json>({});
export const setProseStateCtx = createContext<Dispatch<SetStateAction<Json>>>(
  () => {}
);

export const useProseState = () => useContext(proseStateCtx);

export const useSetProseState = () => useContext(setProseStateCtx);
