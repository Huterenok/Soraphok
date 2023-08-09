"use client";

import { inspectorCtx, setInspectorCtx } from "../../lib";
import { Telemetry } from "@milkdown/ctx";
import { FC, useState } from "react";
import { SharedProps } from "shared/config/type/shared";

export const InspectorProvider: FC<SharedProps> = ({ children }) => {
  const [inspector, setInspector] = useState<Telemetry[]>([]);

  return (
    <inspectorCtx.Provider value={inspector}>
      <setInspectorCtx.Provider value={setInspector}>
        {children}
      </setInspectorCtx.Provider>
    </inspectorCtx.Provider>
  );
};
