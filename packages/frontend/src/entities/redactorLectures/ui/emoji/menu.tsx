"use client";

import { EmojiMenuItem } from "./item";
import { useSlashStateEmoji } from "../../lib";
import { SlashProvider } from "@milkdown/plugin-slash";
import { useInstance } from "@milkdown/react";
import { usePluginViewContext } from "@prosemirror-adapter/react";
import { gemoji } from "gemoji";
import { useEffect, useRef } from "react";
import { menuEmoji } from "./menu.module.scss";
import { EmojiMenuUi } from "shared/ui/EmojiMenu";

const emojiSearchRegexp = /:(?<search>\S+)/;

export const EmojiMenuSlash = () => {
  const { view, prevState } = usePluginViewContext();
  const slashProvider = useRef<SlashProvider>();
  const ref = useRef<HTMLDivElement>(null);
  const instance = useInstance();
  const [loading] = instance;

  const { root, setOpened, setSelected, selected, setSearch, emojis, onPick } =
    useSlashStateEmoji(instance);

  useEffect(() => {
    if (!ref.current || loading) return;

    slashProvider.current ??= new SlashProvider({
      content: ref.current,
      debounce: 50,
      shouldShow(this: SlashProvider, view) {
        const currentTextBlockContent = this.getContent(view);

        if (!currentTextBlockContent) {
          setSearch("");
          return false;
        }

        const search = currentTextBlockContent.match(emojiSearchRegexp);
        if (!search) {
          setSearch("");
          return false;
        }

        const text = search.groups!.search;
        const index = gemoji.findIndex((emoji) => {
          return emoji.names.some((name) => name.includes(text));
        });

        if (index < 0) {
          setSearch("");
          return false;
        }

        setSearch(text);
        return true;
      },
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
  }, [loading, root, setOpened, setSearch, setSelected]);

  useEffect(() => {
    slashProvider.current?.update(view, prevState);
  });

  return (
    <div role="tooltip" ref={ref}>
      <EmojiMenuUi />

      {/* {emojis.length > 0 && (
        <ul className={menuEmoji}>
          {emojis.map((item, i) => (
            <EmojiMenuItem
              key={i.toString()}
              index={i}
              instance={instance}
              onSelect={onPick}
              selected={i === selected}
              setSelected={setSelected}
            >
              {item.emoji} :{item.names[0]}:
            </EmojiMenuItem>
          ))}
        </ul>
      )} */}
    </div>
  );
};
