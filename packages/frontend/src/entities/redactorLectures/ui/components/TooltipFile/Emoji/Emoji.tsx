import { Content as TabsContent } from "@radix-ui/react-tabs";
import { tabsContentWrapper, input } from "../TooltipFile.module.scss";
import { tabs } from "entities/redactorLectures/config";
import { EmojiMenuUi } from "shared/ui/EmojiMenu";

export const Emoji = () => {
  return (
    <TabsContent className={tabsContentWrapper} value={tabs.EMOJI.key}>
      <input className={input} />

      <EmojiMenuUi />
    </TabsContent>
  );
};
