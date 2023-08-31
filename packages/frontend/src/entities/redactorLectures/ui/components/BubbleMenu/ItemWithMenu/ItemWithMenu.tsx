import { useInstance } from "@milkdown/react";
import * as Popover from "@radix-ui/react-popover";
import { ToggleItem as ToggleItemToolbar } from "@radix-ui/react-toolbar";
import { MenuComponents } from "../..";
import { contentModal, buttonTrigger } from "./ItemWithMenu.module.scss";

export const ItemWithMenu = () => {
  const instance = useInstance();

  return (
    <ToggleItemToolbar value="componentsMenu" asChild>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className={buttonTrigger}>Menu</button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content className={contentModal} sideOffset={5}>
            <MenuComponents instance={instance} />
            {/* <div>scscd</div> */}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </ToggleItemToolbar>
  );
};
