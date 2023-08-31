import { createEvent, createStore } from "effector";

export const srcFactory = () => {
  const $srcStore = createStore<string | null>(
    "https://www.notion.so/images/page-cover/woodcuts_2.jpg"
  );

  const changeSrc = createEvent<string>();

  $srcStore.on(changeSrc, (_, payload) => payload);

  return {
    $srcStore,
    changeSrc,
  };
};
