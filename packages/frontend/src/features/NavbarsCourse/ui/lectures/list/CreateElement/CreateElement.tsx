import { Tooltip } from "shared/ui/Tooltip";
import {
  createElementWrapper,
  createElementBtn,
  tooltipDescription,
} from "./CreateElement.module.scss";
import file from "./img/file.svg";
import folder from "./img/folder.svg";
import Image from "next/image";
import { useUnit } from "effector-react";
import { addLecture } from "../../../../model";
import { LectureElement } from "../../../../config";
import { v4 as uuidv4 } from "uuid";

interface CreateElementProps {
  idParent?: string;
}

export const CreateElement = ({ idParent }: CreateElementProps) => {
  const addLectureUnit = useUnit(addLecture);

  return (
    <div className={createElementWrapper}>
      <Tooltip
        trigger={
          <button
            className={createElementBtn}
            onClick={() => {
              const id = uuidv4();
              addLectureUnit({
                id: idParent,
                lecture: {
                  id,
                  type: LectureElement.PAGE,
                  trigger: {
                    to: `./id${id}`,
                    title: `Lesson ${id.split("-")[0]}`,
                  },
                },
              });
            }}
          >
            <Image src={file} alt="file" />
          </button>
        }
        contentClassname={tooltipDescription}
        content={"Create a file"}
      />

      <Tooltip
        trigger={
          <button
            className={createElementBtn}
            onClick={() => {
              const id = uuidv4();
              addLectureUnit({
                id: idParent,
                lecture: {
                  id,
                  type: LectureElement.FOLDER,
                  trigger: `Folder ${id.split("-")[0]}`,
                  nestedPages: [],
                },
              });
            }}
          >
            <Image src={folder} alt="folder" />
          </button>
        }
        contentClassname={tooltipDescription}
        content={"Create a folder"}
      />
    </div>
  );
};
