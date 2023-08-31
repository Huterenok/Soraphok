"use client";

import { commandsCtx } from "@milkdown/core";
import { TooltipProvider } from "@milkdown/plugin-tooltip";
import {
  addColAfterCommand,
  addColBeforeCommand,
  addRowAfterCommand,
  addRowBeforeCommand,
  deleteSelectedCellsCommand,
  moveColCommand,
  moveRowCommand,
  selectColCommand,
  selectRowCommand,
  selectTableCommand,
  setAlignCommand,
} from "@milkdown/preset-gfm";
import { CellSelection } from "@milkdown/prose/tables";
import { useInstance } from "@milkdown/react";
import {
  usePluginViewContext,
  useWidgetViewContext,
} from "@prosemirror-adapter/react";
import clsx from "clsx";
import type { FC } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { TooltipButton } from "./tooltipButton/TooltipButton";
import {
  commonWidget,
  commonWidgetCircle,
  commonWidgetLeft,
  commonWidgetTop,
} from "./Table.module.scss";
import "./tableEditor.scss";
import back from "./tooltipButton/img/back.svg";
import next from "./tooltipButton/img/next.svg";
import deleteIcon from "./tooltipButton/img/delete.svg";
import alignLeft from "./tooltipButton/img/alignLeft.svg";
import alignCenter from "./tooltipButton/img/alignCenter.svg";
import alignRight from "./tooltipButton/img/alignRight.svg";
import { tableTooltipCtx } from "../../../lib";

export const TableTooltip: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { view } = usePluginViewContext();
  const tooltipProvider = useRef<TooltipProvider>();
  const [loading, getEditor] = useInstance();

  const isRow =
    view.state.selection instanceof CellSelection &&
    view.state.selection.isRowSelection();
  const isCol =
    view.state.selection instanceof CellSelection &&
    view.state.selection.isColSelection();
  const isWholeTable = isRow && isCol;
  const isHeading =
    isRow &&
    view.state.doc.nodeAt((view.state.selection as CellSelection).$headCell.pos)
      ?.type.name === "table_header";

  useEffect(() => {
    if (
      ref.current &&
      !loading &&
      !tooltipProvider.current &&
      view &&
      view.state
    ) {
      const provider = new TooltipProvider({
        content: ref.current,
        tippyOptions: {
          zIndex: 30,
        },
        shouldShow: () => {
          return false;
        },
      });

      provider.update(view);

      const editor = getEditor();

      if (editor && editor.ctx && editor.ctx.isInjected(tableTooltipCtx.key)) {
        editor.ctx.set(tableTooltipCtx.key, provider);
        tooltipProvider.current = provider;
      }
    }

    return () => {
      tooltipProvider.current?.destroy();
    };
  }, [getEditor, loading, view]);

  return (
    <div>
      <div ref={ref}>
        {!isWholeTable && !isHeading && isRow && (
          <TooltipButton
            icon={back}
            onClick={() => {
              if (loading) return;

              getEditor().action((ctx) => {
                ctx.get(commandsCtx).call(addRowBeforeCommand.key);
              });
              tooltipProvider.current?.hide();
            }}
          />
        )}
        {!isWholeTable && isCol && (
          <TooltipButton
            icon={back}
            onClick={() => {
              if (loading) return;

              getEditor().action((ctx) => {
                ctx.get(commandsCtx).call(addColBeforeCommand.key);
              });
              tooltipProvider.current?.hide();
            }}
          />
        )}
        {(isWholeTable || !isHeading) && (
          <TooltipButton
            icon={deleteIcon}
            onClick={() => {
              if (loading) return;

              getEditor().action((ctx) => {
                ctx.get(commandsCtx).call(deleteSelectedCellsCommand.key);
              });
              tooltipProvider.current?.hide();
            }}
          />
        )}
        {!isWholeTable && isRow && (
          <TooltipButton
            icon={next}
            onClick={() => {
              if (loading) return;

              getEditor().action((ctx) => {
                ctx.get(commandsCtx).call(addRowAfterCommand.key);
              });
              tooltipProvider.current?.hide();
            }}
          />
        )}
        {!isWholeTable && isCol && (
          <TooltipButton
            icon={next}
            onClick={() => {
              if (loading) return;
              getEditor().action((ctx) => {
                ctx.get(commandsCtx).call(addColAfterCommand.key);
              });

              tooltipProvider.current?.hide();
            }}
          />
        )}
        {!isWholeTable && isCol && (
          <TooltipButton
            icon={alignLeft}
            onClick={() => {
              if (loading) return;
              getEditor().action((ctx) => {
                ctx.get(commandsCtx).call(setAlignCommand.key, "left");
              });
            }}
          />
        )}
        {!isWholeTable && isCol && (
          <TooltipButton
            icon={alignCenter}
            onClick={() => {
              if (loading) return;
              getEditor().action((ctx) => {
                ctx.get(commandsCtx).call(setAlignCommand.key, "center");
              });
            }}
          />
        )}
        {!isWholeTable && isCol && (
          <TooltipButton
            icon={alignRight}
            onClick={() => {
              if (loading) return;
              getEditor().action((ctx) => {
                ctx.get(commandsCtx).call(setAlignCommand.key, "right");
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export const TableSelectorWidget: FC = () => {
  const { spec } = useWidgetViewContext();
  const type = spec?.type;
  const index = spec?.index ?? 0;
  const [loading, getEditor] = useInstance();
  const ref = useRef<HTMLDivElement>(null);

  const [dragOver, setDragOver] = useState(false);

  const common = useMemo(
    () => clsx(commonWidget, dragOver ? "ring-2" : ""),
    [dragOver]
  );

  const className = useMemo(() => {
    if (type === "left") return commonWidgetLeft;

    if (type === "top") return commonWidgetTop;

    return commonWidgetCircle;
  }, [type]);

  return (
    <div
      ref={ref}
      draggable={type !== "top-left"}
      className={[className, common].join(" ")}
      onClick={(e) => {
        e.stopPropagation();
        const div = ref.current;
        if (loading || !div) return;

        getEditor().action((ctx) => {
          const tooltip = ctx.get(tableTooltipCtx.key);
          tooltip?.getInstance()?.setProps({
            getReferenceClientRect: () => {
              return div.getBoundingClientRect();
            },
          });
          tooltip?.show();

          const commands = ctx.get(commandsCtx);

          if (type === "left") commands.call(selectRowCommand.key, index);
          else if (type === "top") commands.call(selectColCommand.key, index);
          else commands.call(selectTableCommand.key);
        });
      }}
      onDragStart={(e) => {
        e.stopPropagation();

        const data = { index: spec?.index, type: spec?.type };
        e.dataTransfer.setData(
          "application/milkdown-table-sort",
          JSON.stringify(data)
        );
        e.dataTransfer.effectAllowed = "move";
      }}
      onDragOver={(e) => {
        setDragOver(true);
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDragLeave={() => {
        setDragOver(false);
      }}
      onDrop={(e) => {
        setDragOver(false);
        if (type === "top-left") return;
        const i = spec?.index;
        if (loading || i == null) return;
        const data = e.dataTransfer.getData("application/milkdown-table-sort");
        try {
          const { index, type } = JSON.parse(data);

          getEditor().action((ctx) => {
            const commands = ctx.get(commandsCtx);
            const options = {
              from: Number(index),
              to: i,
            };

            commands.call(
              type === "left" ? moveRowCommand.key : moveColCommand.key,
              options
            );
          });
        } catch {
          // ignore data from other source
        }
      }}
    />
  );
};
