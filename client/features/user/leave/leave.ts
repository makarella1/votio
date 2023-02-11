import { redirect, Routes } from "@shared/config/router";
import { cookies } from "@shared/lib/cookies";
import { createEffect } from "effector";
import { Socket } from "socket.io-client";

export const leaveFx = createEffect((socket: Socket) => {
  socket.disconnect();

  cookies.removeCookieFx("accessToken");
});

redirect({
  clock: leaveFx.done,
  fn: () => Routes.WELCOME,
});
