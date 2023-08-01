import type { FC, ReactNode } from "react";
import { useState } from "react";
import { Share, setShareCtx, shareCtx } from "../../model";

export const ShareProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [share, setShare] = useState<Share>(() => {});

  return (
    <shareCtx.Provider value={share}>
      <setShareCtx.Provider value={setShare}>{children}</setShareCtx.Provider>
    </shareCtx.Provider>
  );
};
