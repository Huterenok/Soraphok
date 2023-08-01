import {
  defaultFeatureToggle,
  featureToggleCtx,
  setFeatureToggleCtx,
} from "../../model";
import type { FC, ReactNode } from "react";
import { useState } from "react";

export const FeatureToggleProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [featureToggle, setFeatureToggle] = useState(defaultFeatureToggle);

  return (
    <featureToggleCtx.Provider value={featureToggle}>
      <setFeatureToggleCtx.Provider value={setFeatureToggle}>
        {children}
      </setFeatureToggleCtx.Provider>
    </featureToggleCtx.Provider>
  );
};
