"use client";

import { config } from "../../config";
import { SlashItem } from "./item";
import { useSlashStateMenu } from "../../lib";
import { SlashProvider } from "@milkdown/plugin-slash";
import { useInstance } from "@milkdown/react";
import { usePluginViewContext } from "@prosemirror-adapter/react";
import { useEffect, useRef } from "react";
import { menuUl } from "./menu.module.scss";

export const Slash = () => {
  const { view, prevState } = usePluginViewContext();
  const slashProvider = useRef<SlashProvider>();
  const ref = useRef<HTMLDivElement>(null);
  const instance = useInstance();
  const [loading] = instance;
  const { root, setOpened, onKeydown, setSelected, selected } =
    useSlashStateMenu(instance);

  useEffect(() => {
    if (!ref.current || loading) return;

    slashProvider.current ??= new SlashProvider({
      content: ref.current,
      debounce: 50,
      tippyOptions: {
        onShow: () => {
          setOpened(true);
          root?.addEventListener("keydown", onKeydown);
        },
        onHide: () => {
          setSelected(0);
          setOpened(false);
          root?.removeEventListener("keydown", onKeydown);
        },
      },
    });

    return () => {
      slashProvider.current?.destroy();
      slashProvider.current = undefined;
    };
  }, [loading, onKeydown, root, setOpened, setSelected]);

  useEffect(() => {
    slashProvider.current?.update(view, prevState);
  });

  return (
    <div className="hidden">
      <div role="tooltip" ref={ref}>
        <ul className={menuUl}>
          {config.map((item, i) => (
            <SlashItem
              key={i.toString()}
              index={i}
              instance={instance}
              onSelect={(ctx) => item.onSelect(ctx)}
              setSelected={setSelected}
              title={item.title}
              image={item.image}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
