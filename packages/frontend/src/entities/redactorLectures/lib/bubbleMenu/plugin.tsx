import { tooltipFactory } from "@milkdown/plugin-tooltip";
import { TooltipProvider } from "@milkdown/plugin-tooltip";
import { useInstance } from "@milkdown/react";
import { usePluginViewContext } from "@prosemirror-adapter/react";
import { useEffect, useRef } from "react";

export const tooltipBubble = tooltipFactory("SelectionText");

export const useBubbleMenu = () => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const tooltipProvider = useRef<TooltipProvider>();

  const { view, prevState } = usePluginViewContext();
  const [loading] = useInstance();
  let selectionMarks: string[] = [];

  const { $from, $to } = view.state.selection;
  view.state.doc.nodesBetween($from.pos, $to.pos, (node) => {
    const marks: string[] = node.marks.map((mark) => {
      return mark.type.name;
    });
    if (marks.length > 0) selectionMarks = marks;
  });

  useEffect(() => {
    const div = bubbleRef.current;
    if (loading || !div) return;

    tooltipProvider.current = new TooltipProvider({
      content: div,
    });

    return () => {
      tooltipProvider.current?.destroy();
    };
  }, [loading]);

  useEffect(() => {
    tooltipProvider.current?.update(view, prevState);
  });

  return { bubbleRef, selectionMarks };
};
