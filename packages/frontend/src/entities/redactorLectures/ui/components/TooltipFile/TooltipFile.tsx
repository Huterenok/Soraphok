import * as Popover from "@radix-ui/react-popover";
import * as Tabs from "@radix-ui/react-tabs";
import {
  popoverContent,
  TabsList,
  TabsTrigger,
} from "./TooltipFile.module.scss";
import { tabs } from "../../../config";
import { Link } from "./Link/Link";
import { Upload } from "./Upload/Upload";
import { Unplash } from "./Unplash/Unplash";
import { Emoji } from "./Emoji/Emoji";

export const TooltipFile = () => {
  return (
    <Popover.Portal>
      <Popover.Content className={popoverContent} sideOffset={5}>
        <Tabs.Root defaultValue={tabs.UPLOAD.key}>
          <Tabs.List className={TabsList}>
            {Object.values(tabs).map((tab) => (
              <Tabs.Trigger
                key={tab.key}
                className={TabsTrigger}
                value={tab.key}
              >
                {tab.title}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Upload />
          <Link />
          <Unplash />
          <Emoji />
        </Tabs.Root>
      </Popover.Content>
    </Popover.Portal>
  );
};
