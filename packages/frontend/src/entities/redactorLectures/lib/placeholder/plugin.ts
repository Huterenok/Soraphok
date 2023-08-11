import { Plugin, PluginKey } from "@milkdown/prose/state";
import type { EditorView } from "@milkdown/prose/view";
import { $prose } from "@milkdown/utils";
import { useMemo } from "react";
const shouldRenderPlaceholder = (view: EditorView) => {
  const {
    editable,
    state: { doc },
  } = view;

  if (!editable) {
    return false;
  }
  if (doc.childCount > 1) {
    return false;
  }
  if (!doc.firstChild?.isTextblock) {
    return false;
  }
  if (doc.firstChild.content.size > 0) {
    return false;
  }
  if (doc.firstChild?.type.name !== "paragraph") {
    return false;
  }
  return true;
};

export const usePlaceholderPlugin = () => {

  const placeholderPlugin = useMemo(
    () =>
      $prose(() => {
        const key = new PluginKey("MILKDOWN_PLACEHOLDER_PLUGIN");

        const update = (view: EditorView) => {
          if (shouldRenderPlaceholder(view)) {
            view.dom.setAttribute("data-placeholder", "Post an update..");
          } else {
            view.dom.removeAttribute("data-placeholder");
          }
        };

        return new Plugin({
          key,
          view: (view) => {
            update(view);

            return { update };
          },
        });
      }),
    []
  );

  return placeholderPlugin;
};
