import { pollsApi } from "@shared/api/polls";
import { CreatePollBody, JoinPollBody } from "@shared/api/polls/types";
import { cookies } from "@shared/lib/cookies";
import { createEffect, createStore, merge } from "effector";
import { Poll } from "shared";

export const createPollFx = createEffect(
  async (body: CreatePollBody) => await pollsApi.createPoll(body),
);

export const joinPollFx = createEffect(
  async (body: JoinPollBody) => await pollsApi.joinPoll(body),
);

const $poll = createStore<Poll | null>(null);

export const $created = createStore(false);

export const $createPollLoading = createPollFx.pending;
export const $joinPollLoading = joinPollFx.pending;

const joinedOrCreated = merge([joinPollFx.doneData, createPollFx.doneData]);

$poll.on(joinedOrCreated, (_, { data: { poll } }) => poll);

joinedOrCreated.watch(({ data: { accessToken } }) => {
  cookies.set({
    name: "accessToken",
    value: accessToken,
    expires: parseInt(import.meta.env.VITE_COOKIE_TTL),
  });
});
