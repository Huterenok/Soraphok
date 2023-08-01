import { inspectorCtx, setInspectorCtx } from "../../model";
import { Telemetry } from "@milkdown/ctx";
import { FC, ReactNode, useState } from "react";

export const InspectorProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inspector, setInspector] = useState<Telemetry[]>([]);

  return (
    <inspectorCtx.Provider value={inspector}>
      <setInspectorCtx.Provider value={setInspector}>
        {children}
      </setInspectorCtx.Provider>
    </inspectorCtx.Provider>
  );
};
