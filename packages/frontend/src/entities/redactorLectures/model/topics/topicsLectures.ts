import { createEvent, createStore } from "effector";

export const $topicsLectures = createStore<string[]>([]);

export const addTopics = createEvent<string[]>();

$topicsLectures.on(addTopics, (state, payload) => {
  if (JSON.stringify(state) === JSON.stringify(payload)) return state;

  return payload;
});
