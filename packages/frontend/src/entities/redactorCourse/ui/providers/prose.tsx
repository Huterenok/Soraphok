"use client";

import { Json, proseStateCtx, setProseStateCtx } from "../../lib";
import type { FC } from "react";
import { useState } from "react";
import { SharedProps } from "shared/config/type/shared";

export const ProseStateProvider: FC<SharedProps> = ({ children }) => {
  const [proseState, setProseState] = useState<Json>({});
  return (
    <proseStateCtx.Provider value={proseState}>
      <setProseStateCtx.Provider value={setProseState}>
        {children}
      </setProseStateCtx.Provider>
    </proseStateCtx.Provider>
  );
};
