import { Json, proseStateCtx, setProseStateCtx } from "../../model";
import type { FC, ReactNode } from "react";
import { useState } from "react";

export const ProseStateProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [proseState, setProseState] = useState<Json>({});
  return (
    <proseStateCtx.Provider value={proseState}>
      <setProseStateCtx.Provider value={setProseState}>
        {children}
      </setProseStateCtx.Provider>
    </proseStateCtx.Provider>
  );
};
