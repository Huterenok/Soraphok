import {
  Root as RootPopover,
  Trigger as TriggerPopover,
  Portal as PortalPopover,
  Content as ContentPopover,
} from "@radix-ui/react-popover";
import {
  Root as RootTabs,
  List as ListTabs,
  Tabs,
  Content as ContentTabs,
} from "@radix-ui/react-tabs";
import menu from "./img/menu.svg";
import { FormLabel } from "./formLabel/formLabel";
import { openMenu, tooltipCommon } from "./modal.module.scss";
import Image from "next/image";

export interface attrsImage {
  src: string;
  alt: string;
  title: string;
}

interface ModalImageProps {
  onChange: (keyImage: string, value: string) => void;
  attrs: attrsImage;
}

export const ModalImage = ({ attrs, onChange }: ModalImageProps) => {
  const { src, alt, title } = attrs;

  return (
    <RootPopover>
      <TriggerPopover asChild>
        <button className={openMenu} aria-label="Customise options">
          <Image src={menu} alt="menu" />
        </button>
      </TriggerPopover>

      <PortalPopover>
        <RootTabs className="TabsRoot" defaultValue="tab1">
          <ListTabs className="TabsList" aria-label="Manage your account">
            <Tabs className="TabsTrigger" value="tab1">
              Account
            </Tabs>

            <Tabs className="TabsTrigger" value="tab2">
              Password
            </Tabs>
          </ListTabs>

          <ContentTabs className="TabsContent" value="tab1">
            <ContentPopover className={tooltipCommon} sideOffset={5}>
              <FormLabel
                title="Link"
                defaultValue={src}
                onChange={onChange}
                keyImage="src"
              />
              <FormLabel
                title="Alt"
                defaultValue={alt}
                onChange={onChange}
                keyImage="alt"
              />
              <FormLabel
                title="Title"
                defaultValue={title}
                onChange={onChange}
                keyImage="title"
              />
            </ContentPopover>
          </ContentTabs>

          <ContentTabs className="TabsContent" value="tab2">
            <ContentPopover className={tooltipCommon} sideOffset={5}>
              <FormLabel
                title="Title"
                defaultValue={title}
                onChange={onChange}
                keyImage="title"
              />
            </ContentPopover>
          </ContentTabs>
        </RootTabs>

        {/* <ContentPopover className={tooltipCommon} sideOffset={5}>
          <FormLabel
            title="Link"
            defaultValue={src}
            onChange={onChange}
            keyImage="src"
          />
          <FormLabel
            title="Alt"
            defaultValue={alt}
            onChange={onChange}
            keyImage="alt"
          />
          <FormLabel
            title="Title"
            defaultValue={title}
            onChange={onChange}
            keyImage="title"
          />
        </ContentPopover> */}
      </PortalPopover>
    </RootPopover>
  );
};
