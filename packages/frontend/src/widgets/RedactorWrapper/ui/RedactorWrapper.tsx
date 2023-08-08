"use client";

import { useCallback, useRef } from "react";

import { ProviderRedactor, type MilkdownRef } from "entities/redactorCourse";
import dynamic from "next/dynamic";

const RedactorCourse = dynamic(
  () =>
    import("entities/redactorCourse").then((module) => ({
      default: module.RedactorCourse,
    })),
  {
    ssr: false,
  }
);

const defaultValueContent = `
# Hello world!

![greeting bear](https://milkdown.dev/polar.jpeg)
`;

export const RedactorWrapper = () => {
  const milkdownRef = useRef<MilkdownRef>(null);

  const onMilkdownChange = useCallback((markdown: string) => {
    // console.log(markdown);
  }, []);
  return (
    <ProviderRedactor>
      <RedactorCourse
        milkdownRef={milkdownRef}
        content={defaultValueContent}
        onChange={onMilkdownChange}
      />
    </ProviderRedactor>
  );
};
