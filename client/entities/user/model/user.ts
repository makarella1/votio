import { socket } from "@shared/api/socket";
import { createEffect, createEvent, createStore } from "effector";

import { Me, UserConnection } from "./types";

export const initializeConnectionFx = createEffect(() => socket.getInstance());

export const $userConnection = createStore<UserConnection>({});

export const resetMe = createEvent();

export const $me = createStore<Me>({}).reset(resetMe);

export const setMe = createEvent<Me>();

$me.on(setMe, (_, me) => me);

$userConnection.on(initializeConnectionFx.doneData, (_, socket) => ({
  socket,
}));
