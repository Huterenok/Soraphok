"use client";

import { useCallback, useRef } from "react";
import { redactorLessonWrapper } from "./RedactorWrapper.module.scss";
import {
  ProviderRedactor,
  type MilkdownRef,
  HeaderLesson,
} from "entities/redactorLectures";
import dynamic from "next/dynamic";

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

  const onMilkdownChange = useCallback((markdown: string) => {
    // console.log(markdown);
  }, []);

  return (
    <div className={redactorLessonWrapper}>
      <HeaderLesson />

      <ProviderRedactor>
        <RedactorCourse milkdownRef={milkdownRef} onChange={onMilkdownChange} />
      </ProviderRedactor>
    </div>
  );
};
