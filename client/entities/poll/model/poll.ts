import { pollsApi } from "@shared/api/poll";
import { CreatePollBody, JoinPollBody } from "@shared/api/poll/types";
import { cookies } from "@shared/lib/cookies";
import { CookieParams } from "@shared/lib/cookies/types";
import { notifications } from "@shared/lib/notifications";
import {
  createEffect,
  createEvent,
  createStore,
  merge,
  sample,
} from "effector";
import { Poll } from "shared";
import { Socket } from "socket.io";

export const createPollFx = createEffect(
  async (body: CreatePollBody) => await pollsApi.createPoll(body),
);

export const joinPollFx = createEffect(
  async (body: JoinPollBody) => await pollsApi.joinPoll(body),
);

const pollUpdated = createEvent<Poll>();

export const listenToPollUpdatesFx = createEffect((socket: Socket) => {
  socket.on("poll_updated", (poll: Poll) => {
    pollUpdated(poll);
  });
});

export const $poll = createStore<Poll | null>(null);

$poll.watch((poll) => {
  console.log(poll);
});

export const $createPollLoading = createPollFx.pending;
export const $joinPollLoading = joinPollFx.pending;

const joinedOrCreated = merge([joinPollFx.doneData, createPollFx.doneData]);
const failed = merge([joinPollFx.fail, createPollFx.fail]);

$poll.on(joinedOrCreated, (_, { data: { poll } }) => poll);
$poll.on(pollUpdated, (_, updatedPoll) => updatedPoll);

sample({
  clock: joinedOrCreated,
  fn: ({ data: { accessToken } }): CookieParams => {
    const expires = new Date(
      new Date().getTime() + parseInt(import.meta.env.VITE_COOKIE_TTL),
    );

    return { name: "accessToken", value: accessToken, expires };
  },
  target: cookies.setCookieFx,
});

sample({
  clock: joinedOrCreated,
  target: notifications.showToastFx.prepend(() => ({ type: "success" })),
});

sample({
  clock: failed,
  target: notifications.showToastFx.prepend(() => ({ type: "error" })),
});
