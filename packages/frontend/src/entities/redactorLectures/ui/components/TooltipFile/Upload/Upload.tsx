import { Content as TabsContent } from "@radix-ui/react-tabs";
import { bodyUpload } from "./Upload.module.scss";
import { tabsContentWrapper, buttonSubmit } from "../TooltipFile.module.scss";
import { tabs } from "entities/redactorLectures/config";
import { useSelectFile, changeCover } from "../../../../model";

export const Upload = () => {
	const {hadleClick, onSelectFile, filePicker} = useSelectFile(changeCover);

  return (
    <TabsContent className={tabsContentWrapper} value={tabs.UPLOAD.key}>
      <div className={bodyUpload}>
        <button className={buttonSubmit} onClick={hadleClick}>
          Image upload
        </button>
        <input
          onChange={onSelectFile}
          ref={filePicker}
          type="file"
          accept="image/*,.png,.jpg,.gif,.web"
        />
      </div>
    </TabsContent>
  );
};
