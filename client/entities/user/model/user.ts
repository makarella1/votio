import { socket } from "@shared/api/socket";
import { createEffect, createEvent, createStore } from "effector";

import { Me, UserConnection } from "./types";

export const initializeConnectionFx = createEffect(() => socket.getInstance());

const $userConnection = createStore<UserConnection>({});

export const $me = createStore<Me>({});

export const setMe = createEvent<Me>();

$me.on(setMe, (_, me) => me);

$me.watch((me) => {
  console.log(me);
});

$userConnection.on(initializeConnectionFx.doneData, (_, socket) => ({
  socket,
}));
