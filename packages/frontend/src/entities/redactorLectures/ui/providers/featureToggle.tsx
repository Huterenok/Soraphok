"use client";

import {
  defaultFeatureToggle,
  featureToggleCtx,
  setFeatureToggleCtx,
} from "../../lib";
import type { FC } from "react";
import { useState } from "react";
import { SharedProps } from "shared/config/type/shared";

export const FeatureToggleProvider: FC<SharedProps> = ({ children }) => {
  const [featureToggle, setFeatureToggle] = useState(defaultFeatureToggle);

  return (
    <featureToggleCtx.Provider value={featureToggle}>
      <setFeatureToggleCtx.Provider value={setFeatureToggle}>
        {children}
      </setFeatureToggleCtx.Provider>
    </featureToggleCtx.Provider>
  );
};
