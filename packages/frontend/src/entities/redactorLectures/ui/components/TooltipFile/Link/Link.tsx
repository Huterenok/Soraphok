import { Content as TabsContent } from "@radix-ui/react-tabs";
import {
  tabsContentWrapper,
  input,
  buttonSubmit,
} from "../TooltipFile.module.scss";
import { tabProps, tabs } from "entities/redactorLectures/config";
import { useCallback, useRef } from "react";

export const Link = ({ changeValue }: tabProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickChangeValue = useCallback(() => {
    if (!inputRef || !inputRef?.current) return;
    console.log(inputRef.current.value);
    changeValue(inputRef.current.value);
  }, [inputRef, changeValue]);

  return (
    <TabsContent className={tabsContentWrapper} value={tabs.LINK.key}>
      <input className={input} ref={inputRef} />

      <button className={buttonSubmit} onClick={onClickChangeValue}>
        Submit
      </button>
    </TabsContent>
  );
};
