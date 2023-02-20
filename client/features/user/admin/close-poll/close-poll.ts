import { createEffect } from "effector";
import { Socket } from "socket.io-client";

export const closeFx = createEffect((socket: Socket) => {
  socket.emit("close_poll");
});
