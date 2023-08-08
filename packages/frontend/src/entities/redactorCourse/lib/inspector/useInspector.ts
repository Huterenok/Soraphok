import { Telemetry } from "@milkdown/ctx";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

export const inspectorCtx = createContext<Telemetry[]>([]);
export const setInspectorCtx = createContext<
  Dispatch<SetStateAction<Telemetry[]>>
>(() => {});

export const useInspector = () => useContext(inspectorCtx);
export const useSetInspector = () => useContext(setInspectorCtx);


