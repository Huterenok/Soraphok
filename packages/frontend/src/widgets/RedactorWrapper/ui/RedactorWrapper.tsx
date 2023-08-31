"use client";

import { useCallback, useRef } from "react";
import { redactorLessonWrapper } from "./RedactorWrapper.module.scss";
import {
  ProviderRedactor,
  type MilkdownRef,
  HeaderLesson,
  setTopics,
} from "entities/redactorLectures";
import dynamic from "next/dynamic";
import { useUnit } from "effector-react";
import debounce from "lodash.debounce";

const RedactorCourse = dynamic(
  () =>
    import("entities/redactorLectures").then((module) => ({
      default: module.RedactorLectures,
    })),
  {
    ssr: false,
  }
);

export const RedactorWrapper = () => {
  const milkdownRef = useRef<MilkdownRef>(null);
  const setTopicsUnit = useUnit(setTopics);

  const onMilkdownChange = useCallback(
    debounce((markdown: string) => {
      console.log(markdown);
      setTopicsUnit(markdown);
    }, 500),
    [setTopicsUnit, debounce]
  );

  return (
    <div className={redactorLessonWrapper}>
      <HeaderLesson />

      <ProviderRedactor>
        <RedactorCourse milkdownRef={milkdownRef} onChange={onMilkdownChange} />
      </ProviderRedactor>
    </div>
  );
};
