import * as TooltipUi from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

interface TooltipProps {
  trigger: ReactNode;
  contentClassname: string;
  content: ReactNode;
}

export const Tooltip = ({
  trigger,
  content,
  contentClassname,
}: TooltipProps) => (
  <TooltipUi.Provider>
    <TooltipUi.Root>
      <TooltipUi.Trigger asChild>{trigger}</TooltipUi.Trigger>

      <TooltipUi.Portal>
        <TooltipUi.Content sideOffset={5} className={contentClassname}>
          {content}
        </TooltipUi.Content>
      </TooltipUi.Portal>
    </TooltipUi.Root>
  </TooltipUi.Provider>
);
