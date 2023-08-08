"use client";

import { commandsCtx } from "@milkdown/core";
import { tooltipFactory, TooltipProvider } from "@milkdown/plugin-tooltip";
import { updateImageCommand } from "@milkdown/preset-commonmark";
import { NodeSelection } from "@milkdown/prose/state";
import { useInstance } from "@milkdown/react";
import { usePluginViewContext } from "@prosemirror-adapter/react";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import { tooltipCommon } from "./ImageTooltip.module.scss";
import { FormLabel } from "./formLabel/formLabel";

export const ImageTooltip: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { view, prevState } = usePluginViewContext();
  const tooltipProvider = useRef<TooltipProvider>();
  const { state } = view;
  const { selection } = state;
  const imageNode = state.doc.nodeAt(selection.from);
  const [loading, getEditor] = useInstance();
  const { src, alt, title } = imageNode?.attrs ?? {};

  useEffect(() => {
    if (ref.current && !tooltipProvider.current && !loading) {
      const provider = new TooltipProvider({
        content: ref.current,
        tippyOptions: {
          zIndex: 30,
          appendTo: document.body,
        },
        shouldShow: (view) => {
          const { selection } = view.state;
          const { empty, from } = selection;

          const isTooltipChildren = provider.element.contains(
            document.activeElement
          );

          const notHasFocus = !view.hasFocus() && !isTooltipChildren;

          const isReadonly = !view.editable;

          if (notHasFocus || empty || isReadonly) {
            return false;
          }

          return (
            selection instanceof NodeSelection &&
            view.state.doc.nodeAt(from)?.type.name === "image"
          );
        },
      });

      tooltipProvider.current = provider;
    }

    return () => {
      tooltipProvider.current?.destroy();
    };
  }, [loading]);

  useEffect(() => {
    tooltipProvider.current?.update(view, prevState);
  });

  const onChange = (
    key: string,
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if (loading) {
      return;
    }

    const value = e.target.value;
    if (value === imageNode?.attrs[key]) {
      return;
    }

    getEditor().action((ctx) => {
      const commands = ctx.get(commandsCtx);
      commands.call(updateImageCommand.key, {
        [key]: (e.target as HTMLInputElement).value,
      });
    });
  };

  return (
    <div className="hidden">
      <div ref={ref} className={tooltipCommon}>
        <FormLabel
          title="Link"
          defaultValue={src}
          onChange={onChange}
          key="src"
        />
        <FormLabel
          title="Alt"
          defaultValue={alt}
          onChange={onChange}
          key="alt"
        />
        <FormLabel
          title="Title"
          defaultValue={title}
          onChange={onChange}
          key="title"
        />
      </div>
    </div>
  );
};

export const imageTooltip = tooltipFactory("IMAGE");
