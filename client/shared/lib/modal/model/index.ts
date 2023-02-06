import { createEvent, createStore } from "effector";

export const open = createEvent();
export const close = createEvent();

export const $isOpened = createStore(false)
  .on(open, () => true)
  .on(close, () => false);
