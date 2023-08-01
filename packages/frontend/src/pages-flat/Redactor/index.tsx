"use client";

import { ProviderRedactor, type MilkdownRef } from "entities/redactor";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useCallback, useRef } from "react";
import { Button } from "shared/ui/Button";

const PlaygroundMilkdown = dynamic(
  () =>
    import("entities/redactor").then((module) => ({
      default: module.EditorMilkdown,
    })),
  {
    ssr: false,
  }
);

export function Redactor() {
  const milkdownRef = useRef<MilkdownRef>(null);

  const onMilkdownChange = useCallback((markdown: string) => {}, []);

  return (
    <>
      <Head>
        <title>Playground | Milkdown</title>
      </Head>
      <div>
				<Button />
        <ProviderRedactor>
          <PlaygroundMilkdown
            milkdownRef={milkdownRef}
            content={"# Hello world!"}
            onChange={onMilkdownChange}
          />
        </ProviderRedactor>
      </div>
    </>
  );
}
