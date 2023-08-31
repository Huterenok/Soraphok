import { Content as TabsContent } from "@radix-ui/react-tabs";
import {
  tabsContentWrapper,
  input,
  buttonSubmit,
} from "../TooltipFile.module.scss";
import { tabs } from "entities/redactorLectures/config";
import { useCallback, useRef } from "react";
import { changeCover } from "entities/redactorLectures/model";
import { useUnit } from "effector-react";

export const Link = () => {
  const changeCoverUnit = useUnit(changeCover);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickChangeValue = useCallback(() => {
    if (!inputRef || !inputRef?.current) return;
    changeCoverUnit(inputRef.current.value);
  }, [inputRef, changeCoverUnit]);

  return (
    <TabsContent className={tabsContentWrapper} value={tabs.LINK.key}>
      <input className={input} ref={inputRef} />

      <button className={buttonSubmit} onClick={onClickChangeValue}>
        Submit
      </button>
    </TabsContent>
  );
};
