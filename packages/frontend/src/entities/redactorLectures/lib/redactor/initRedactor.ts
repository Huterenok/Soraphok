import { RefObject, useImperativeHandle } from "react";
import { editorViewCtx, parserCtx } from "@milkdown/core";
import { Slice } from "@milkdown/prose/model";
import { MilkdownRef } from "../../config";
import { useRedactor } from "./useRedactor";

export interface InitRedactorProps {
  onChange: (markdown: string) => void;
  milkdownRef: RefObject<MilkdownRef>;
}

export const useRefUpdateRedactor = ({
  milkdownRef,
  onChange,
}: InitRedactorProps) => {
  const { loading, get } = useRedactor(onChange);

  useImperativeHandle(milkdownRef, () => ({
    update: (markdown: string) => {
      if (loading) return;

      const editor = get();
      editor?.action((ctx) => {
        const view = ctx.get(editorViewCtx);
        const parser = ctx.get(parserCtx);
        const doc = parser(markdown);
        if (!doc) return;
        const state = view.state;
        view.dispatch(
          state.tr.replace(
            0,
            state.doc.content.size,
            new Slice(doc.content, 0, 0)
          )
        );
      });
    },
  }));
};
