"use client";

import { LinkI } from "shared/config/type";
import { mockLecture, LectureElement, LectureI } from "../../../config";
import * as Accordion from "@radix-ui/react-accordion";
import {
  content_list,
  ItemList,
  ItemTrigger,
  ItemContent,
} from "./list.module.scss";
import { LinkUI } from "shared/ui/Link";
import arrow from "./img/arrow.svg";
import Image from "next/image";
import { CreateElement } from "./CreateElement/CreateElement";
import { useUnit } from "effector-react";
import { $lecturesList } from "../../../model";

const getListLectures = (lectures: LectureI[]) => {
  return lectures.map((lectureElement) => {
    const isPage = lectureElement.type === LectureElement.PAGE;

    return (
      <Accordion.Item
        className={ItemList}
        key={lectureElement.id}
        value={lectureElement.id}
      >
        {isPage ? (
          <Accordion.Trigger className={ItemTrigger}>
            <LinkUI to={(lectureElement.trigger as LinkI).to}>
              {(lectureElement.trigger as LinkI).title}
            </LinkUI>
          </Accordion.Trigger>
        ) : (
          <>
            <Accordion.Trigger className={ItemTrigger}>
              {String(lectureElement.trigger)}

              <Image src={arrow} alt="arrow" height={20} width={20} />
            </Accordion.Trigger>

            <Accordion.Content className={ItemContent}>
              {getListLectures(lectureElement?.nestedPages ?? [])}

              <CreateElement idParent={lectureElement.id} />
            </Accordion.Content>
          </>
        )}
      </Accordion.Item>
    );
  });
};

export const ListLectures = () => {
  const lescturesStore = useUnit($lecturesList);
  const list = getListLectures(lescturesStore);

  return (
    <Accordion.Root className={content_list} type="multiple">
      {list}
      <CreateElement />
    </Accordion.Root>
  );
};
