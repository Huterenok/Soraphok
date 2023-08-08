"use client";

import { useNodeViewContext } from "@prosemirror-adapter/react";
import clsx from "clsx";
import { codeWrapper, codeHeader } from "./CodeBlock.module.scss";
import { buttonUI } from "shared/ui/Button";
import { DropDown } from "shared/ui/DropDown";

const langs = [
  "text",
  "typescript",
  "javascript",
  "html",
  "css",
  "json",
  "markdown",
];

export const CodeBlock = () => {
  const { contentRef, selected, node, setAttrs } = useNodeViewContext();

  return (
    <div className={clsx(codeWrapper, selected && "ProseMirror-selectednode")}>
      <div
        contentEditable="false"
        suppressContentEditableWarning
        className={codeHeader}
      >
        <DropDown
          selectElement={node.attrs.language || "text"}
          elemets={langs}
          onChangeElemet={(language: string) => () => {
            setAttrs({ language });
          }}
        />

        <button
          className={buttonUI}
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(node.textContent);
          }}
        >
          Copy
        </button>
      </div>

      <pre spellCheck={false} className="!m-0 !mb-4">
        <code ref={contentRef} />
      </pre>
    </div>
  );
};
