import { useBubbleMenu } from "../../../lib";
import {
  SeparatorBubble,
  bubbleMenu,
  groupActions,
} from "./BubbleMenu.module.scss";
import {
  Root as RootToolbar,
  ToggleGroup as ToggleGroupToolbar,
  ToggleItem as ToggleItemToolbar,
  Separator as SeparatorToolbar,
} from "@radix-ui/react-toolbar";
import { BubbleItem } from "./Item/Item";
import {
  toggleStrongCommand,
  toggleEmphasisCommand,
  toggleInlineCodeCommand,
  toggleLinkCommand,
} from "@milkdown/preset-commonmark";
import bold from "./Item/img/bold.svg";
import italic from "./Item/img/italic.svg";
import underline from "./Item/img/underline.svg";
import code from "./Item/img/code.svg";
import link from "./Item/img/link.svg";
import strikethrough from "./Item/img/strikethrough.svg";
import left from "./Item/img/left.svg";
import center from "./Item/img/center.svg";
import right from "./Item/img/right.svg";
import { toggleStrikethroughCommand } from "@milkdown/preset-gfm";
import { toggleUnderlineCommand } from "entities/redactorLectures";
import { ItemWithMenu } from "./ItemWithMenu/ItemWithMenu";

export const BubbleMenu = () => {
  const { bubbleRef, selectionMarks } = useBubbleMenu();

  return (
    <RootToolbar ref={bubbleRef} className={bubbleMenu}>
      <ToggleGroupToolbar
        className={groupActions}
        type="single"
        aria-label="Componets"
      >
        <ItemWithMenu />
      </ToggleGroupToolbar>

      <SeparatorToolbar className={SeparatorBubble} />

      <ToggleGroupToolbar
        className={groupActions}
        type="multiple"
        aria-label="Text formatting"
      >
        <BubbleItem
          value="strong"
          selectionMarks={selectionMarks}
          commad={toggleStrongCommand}
          image={bold}
          description="highlighted, bold"
          descriptionKeyBoard="Mod-b"
        />
        <BubbleItem
          value="emphasis"
          selectionMarks={selectionMarks}
          commad={toggleEmphasisCommand}
          image={italic}
          description="font style italic, slanted"
          descriptionKeyBoard="Mod-i"
        />
        <BubbleItem
          value="inlineCode"
          selectionMarks={selectionMarks}
          commad={toggleInlineCodeCommand}
          image={code}
          description="one-line code"
          descriptionKeyBoard="Mod-e"
        />
        <BubbleItem
          value="link"
          selectionMarks={selectionMarks}
          commad={toggleLinkCommand}
          commadArgs={{
            href: "",
          }}
          image={link}
          description="link to another page"
        />
        <BubbleItem
          value="strike_through"
          selectionMarks={selectionMarks}
          commad={toggleStrikethroughCommand}
          image={strikethrough}
          description="crossed-out text"
          descriptionKeyBoard="Mod-alt-x"
        />
        <BubbleItem
          value="underline"
          selectionMarks={selectionMarks}
          commad={toggleUnderlineCommand}
          image={underline}
          description="underlined text"
          descriptionKeyBoard="Mod-u"
        />
      </ToggleGroupToolbar>

      <SeparatorToolbar className={SeparatorBubble} />
      <ToggleGroupToolbar
        className={groupActions}
        type="multiple"
        aria-label="Text formatting"
      >
        <BubbleItem
          value="left"
          selectionMarks={selectionMarks}
          commad={toggleStrongCommand}
          image={left}
          description="text align left"
          // descriptionKeyBoard="Mod-b"
        />
        <BubbleItem
          value="center"
          selectionMarks={selectionMarks}
          commad={toggleStrongCommand}
          image={center}
          description="text align center"
          // descriptionKeyBoard="Mod-b"
        />
        <BubbleItem
          value="right"
          selectionMarks={selectionMarks}
          commad={toggleStrongCommand}
          image={right}
          description="text align right"
          // descriptionKeyBoard="Mod-b"
        />
      </ToggleGroupToolbar>
    </RootToolbar>
  );
};
