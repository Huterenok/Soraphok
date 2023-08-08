import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  buttonTiger,
  list,
  listElement,
} from "./DropDown.module.scss";
import menu from "./img/menu.svg";
import { Button } from "shared/ui/Button";

interface DropDownProps {
  iconMenu?: string;
  buttonSelectClass?: string;
  selectElement: string;
  elemets: string[];
  onChangeElemet: (newElement: string) => () => void;
}

export const DropDown = ({
  iconMenu = menu,
  buttonSelectClass,
  selectElement,
  elemets,
  onChangeElemet,
}: DropDownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className={buttonTiger}>
          <Button className={buttonSelectClass} icon={iconMenu}>
            {selectElement}
          </Button>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={list} sideOffset={5}>
          {elemets.map((element) => (
            <DropdownMenu.Item
              key={element}
              className={listElement}
              onSelect={onChangeElemet(element)}
            >
              {element}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
