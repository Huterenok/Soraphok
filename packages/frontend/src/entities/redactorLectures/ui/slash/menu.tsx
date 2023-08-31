"use client";

import { useSlashStateMenu } from "../../lib";
import { SlashProvider } from "@milkdown/plugin-slash";
import { useInstance } from "@milkdown/react";
import { usePluginViewContext } from "@prosemirror-adapter/react";
import { useEffect, useRef } from "react";
import { MenuComponents } from "../components";

export const Slash = () => {
  const { view, prevState } = usePluginViewContext();
  const slashProvider = useRef<SlashProvider>();
  const ref = useRef<HTMLDivElement>(null);
  const instance = useInstance();
  const [loading] = instance;
  const { root, setOpened, setSelected } =
    useSlashStateMenu(instance);

  useEffect(() => {
    if (!ref.current || loading) return;

    slashProvider.current ??= new SlashProvider({
      content: ref.current,
      debounce: 50,
      tippyOptions: {
        onShow: () => {
          setOpened(true);
        },
        onHide: () => {
          setSelected(0);
          setOpened(false);
        },
      },
    });

    return () => {
      slashProvider.current?.destroy();
      slashProvider.current = undefined;
    };
  }, [loading, root, setOpened, setSelected]);

  useEffect(() => {
    slashProvider.current?.update(view, prevState);
  });

  return (
    <div className="hidden">
      <div role="tooltip" ref={ref}>
        <MenuComponents instance={instance} setSelected={setSelected} />
      </div>
    </div>
  );
};
