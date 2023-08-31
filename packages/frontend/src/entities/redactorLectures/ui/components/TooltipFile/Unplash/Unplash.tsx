import { Content as TabsContent } from "@radix-ui/react-tabs";
import { input, tabsContentWrapper } from "../TooltipFile.module.scss";
import { bodySearch, bodyTab } from "./Unplash.module.scss";
import { tabs } from "entities/redactorLectures/config";
import { useCallback, useRef } from "react";

export const Unplash = () => {
  return (
    <TabsContent className={tabsContentWrapper} value={tabs.UNPLASH.key}>
      <div className={bodyTab}>
        <div className={bodySearch}>
          <input className={input} />
        </div>

        <div></div>
      </div>
    </TabsContent>
  );
};
