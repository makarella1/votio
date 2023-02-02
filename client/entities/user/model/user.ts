import { socket } from "@shared/api/socket";
import { createEffect, createStore } from "effector";
import { Socket } from "socket.io";

export const initializeConnectionFx = createEffect(() => socket.getInstance());

const $user = createStore<{ socket: Socket } | Record<string, unknown>>({});

$user.on(initializeConnectionFx.doneData, (_, socket) => ({ socket }));
