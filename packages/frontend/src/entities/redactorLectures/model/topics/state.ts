import { createEvent, createStore } from "effector";

export const $topics = createStore<string[]>([]);

export const setTopics = createEvent<string>();

$topics.on(setTopics, (_, payload: string) => {
  const regex = /^(#{1,6})\s*(.*)$/gm;
  let match;
  const topics = [];

  while ((match = regex.exec(payload)) !== null) {
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    const title = match[2].replace(/[*`~]/g, "");
    topics.push(title);
  }

  return topics;
});
