"use client";

import type { FC } from "react";
import { useState } from "react";
import { Share, setShareCtx, shareCtx } from "../../lib";
import { SharedProps } from "shared/config/type/shared";

export const ShareProvider: FC<SharedProps> = ({ children }) => {
  const [share, setShare] = useState<Share>(() => {});

  return (
    <shareCtx.Provider value={share}>
      <setShareCtx.Provider value={setShare}>{children}</setShareCtx.Provider>
    </shareCtx.Provider>
  );
};
