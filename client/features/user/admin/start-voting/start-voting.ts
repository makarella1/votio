import { createEffect } from "effector";
import { Socket } from "socket.io-client";

export const startFx = createEffect((socket: Socket) => {
  socket.emit("start_poll");
});
