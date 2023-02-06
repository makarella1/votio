import { pollsApi } from "@shared/api/poll";
import { CreatePollBody, JoinPollBody } from "@shared/api/poll/types";
import { cookies } from "@shared/lib/cookies";
import { CookieParams } from "@shared/lib/cookies/types";
import {
  combine,
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

export const rejoinPollFx = createEffect(
  async (accessToken: string) => await pollsApi.rejoinPoll(accessToken),
);

const pollUpdated = createEvent<Poll>();
export const connectionFailed = createEvent();

export const listenToPollUpdatesFx = createEffect((socket: Socket) => {
  socket.on("poll_updated", (poll: Poll) => {
    pollUpdated(poll);
  });

  socket.on("connect_error", () => {
    connectionFailed();
  });
});

export const $poll = createStore<Poll | Record<string, never>>({});

export const $createPollLoading = createPollFx.pending;
export const $joinPollLoading = joinPollFx.pending;
export const $rejoinPollLoading = rejoinPollFx.pending;

export const $pollLoading = combine(
  createPollFx.pending,
  joinPollFx.pending,
  rejoinPollFx.pending,
  (createPollLoading, joinPollLoading, rejoinPollLoading) =>
    createPollLoading || joinPollLoading || rejoinPollLoading,
);

const requestDone = merge([joinPollFx.doneData, createPollFx.doneData]);

$poll.on(requestDone, (_, { data: { poll } }) => poll);
$poll.on(pollUpdated, (_, updatedPoll) => updatedPoll);
$poll.on(rejoinPollFx.doneData, (_, { data }) => data);

sample({
  clock: requestDone,
  fn: ({ data: { accessToken } }): CookieParams => {
    const expires = new Date(
      new Date().getTime() + parseInt(import.meta.env.VITE_COOKIE_TTL),
    );

    return { name: "accessToken", value: accessToken, expires };
  },
  target: cookies.setCookieFx,
});
