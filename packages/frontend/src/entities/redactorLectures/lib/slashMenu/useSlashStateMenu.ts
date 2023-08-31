import { slash } from "../../config";
import { rootDOMCtx } from "@milkdown/core";
import { Instance } from "@milkdown/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useSlashStateMenu = (instance: Instance) => {
  const [loading, getEditor] = instance;
  const [selected, setSelected] = useState(0);
  const selectedRef = useRef(0);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  const root = useMemo(() => {
    if (loading) return undefined;
    try {
      return getEditor().ctx.get(rootDOMCtx);
    } catch {
      return undefined;
    }
  }, [getEditor, loading]);

  const setOpened = useCallback(
    (opened: boolean) => {
      getEditor()?.action((ctx) => {
        ctx.update(slash.key, (spec) => ({
          ...spec,
          opened,
        }));
      });
    },
    [getEditor]
  );

  return {
    root,
    setOpened,
    setSelected,
    selected,
  };
};
