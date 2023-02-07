import { createEvent, createStore } from "effector";

export const createModal = () => {
  const open = createEvent();
  const close = createEvent();

  const $isOpened = createStore(false)
    .on(open, () => true)
    .on(close, () => false);

  return { $isOpened, close, open };
};
