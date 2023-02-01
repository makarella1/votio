import { pollsApi } from "@shared/api/polls";
import { CreatePollBody, JoinPollBody } from "@shared/api/polls/types";
import { cookies } from "@shared/lib/cookies";
import { CookieParams } from "@shared/lib/cookies/types";
import { showToastFx } from "@shared/lib/notifications";
import { createEffect, createStore, merge, sample } from "effector";
import { Poll } from "shared";

export const createPollFx = createEffect(
  async (body: CreatePollBody) => await pollsApi.createPoll(body),
);

export const joinPollFx = createEffect(
  async (body: JoinPollBody) => await pollsApi.joinPoll(body),
);

const $poll = createStore<Poll | null>(null);

export const $createPollLoading = createPollFx.pending;
export const $joinPollLoading = joinPollFx.pending;

const joinedOrCreated = merge([joinPollFx.doneData, createPollFx.doneData]);
const failed = merge([joinPollFx.fail, createPollFx.fail]);

$poll.on(joinedOrCreated, (_, { data: { poll } }) => poll);

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
  target: showToastFx.prepend(() => ({ type: "success" })),
});

sample({
  clock: failed,
  target: showToastFx.prepend(() => ({ type: "error" })),
});
