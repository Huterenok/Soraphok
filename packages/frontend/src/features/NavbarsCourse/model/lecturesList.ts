import { createEvent, createStore } from "effector";
import { type LectureI } from "../config";

export const $lecturesList = createStore<LectureI[]>([]);

interface addLecture {
  lecture: LectureI;
  id?: string;
}
export const addLecture = createEvent<addLecture>();
export const renameLecture = createEvent<string>();

const findFolder = (lectures: LectureI[], payloadId: string): any =>
  lectures.find((lecture: LectureI) => {
    const isThisFolder = lecture.id === payloadId;
    console.log(isThisFolder, payloadId);
    if (lecture.nestedPages && !isThisFolder) {
      return findFolder(lecture.nestedPages, payloadId);
    } else {
      return isThisFolder;
    }
  });

$lecturesList.on(addLecture, (state, payload: addLecture) => {
  if (!payload?.id) return [...state, payload.lecture];

  const parentFolder = findFolder(state, payload.id)?.nestedPages?.push(
    payload.lecture
  );
  console.log(parentFolder);

  return [...state];
});
