"use client";

import { useCallback, useRef } from "react";

import { ProviderRedactor, type MilkdownRef } from "entities/redactorLectures";
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
    <ProviderRedactor>
      <RedactorCourse
        milkdownRef={milkdownRef}
        onChange={onMilkdownChange}
      />
    </ProviderRedactor>
  );
};
