import { SetState } from "shared/config/milkdown";
import { createContext, useCallback, useContext } from "react";

export type FeatureToggle = {
  enableGFM: boolean;
  enableMath: boolean;
  enableDiagram: boolean;
  enableTwemoji: boolean;
  enableBlockHandle: boolean;
};

export const defaultFeatureToggle: FeatureToggle = {
  enableGFM: true,
  enableMath: true,
  enableDiagram: true,
  enableTwemoji: true,
  enableBlockHandle: true,
};

export const featureToggleCtx = createContext(defaultFeatureToggle);
export const setFeatureToggleCtx = createContext<SetState<FeatureToggle>>(
  () => {}
);

export const useFeatureToggle = () => useContext(featureToggleCtx);

export const useSetFeatureToggle = () => {
  const setFeatureToggles = useContext(setFeatureToggleCtx);

  return useCallback(
    (config: Partial<FeatureToggle>) => {
      setFeatureToggles((prev) => ({ ...prev, ...config }));
    },
    [setFeatureToggles]
  );
};
