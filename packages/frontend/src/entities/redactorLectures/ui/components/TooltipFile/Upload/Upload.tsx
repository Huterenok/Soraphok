import { Content as TabsContent } from "@radix-ui/react-tabs";
import { bodyUpload, uploadInput } from "./Upload.module.scss";
import { tabsContentWrapper, buttonSubmit } from "../TooltipFile.module.scss";
import { tabProps, tabs } from "entities/redactorLectures/config";
import { ChangeEvent, useCallback, useRef } from "react";

export const Upload = ({ changeValue }: tabProps) => {
  const filePicker = useRef<HTMLInputElement>(null);
  const onSelectFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const imgFile = event.target.files?.[0];
      if (!imgFile) return;
      changeValue(URL.createObjectURL(imgFile));
    },
    [changeValue]
  );

  const hadleClick = useCallback(() => {
    if (!filePicker || !filePicker?.current) return;
    filePicker.current.click();
  }, [filePicker]);

  return (
    <TabsContent className={tabsContentWrapper} value={tabs.UPLOAD.key}>
      <div className={bodyUpload}>
        <button className={buttonSubmit} onClick={hadleClick}>
          Image upload
        </button>
        <input
          className={uploadInput}
          onChange={onSelectFile}
          ref={filePicker}
          type="file"
          accept="image/*,.png,.jpg,.gif,.web"
        />
      </div>
    </TabsContent>
  );
};
