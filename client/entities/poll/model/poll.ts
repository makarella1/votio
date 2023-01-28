import { pollsApi } from "@shared/api/polls";
import { CreatePollBody } from "@shared/api/polls/types";
import { cookies } from "@shared/lib/cookies";
import { createEffect, createStore } from "effector";
import { Poll } from "shared";

export const createPollFx = createEffect(
  async (body: CreatePollBody) => await pollsApi.createPoll(body),
);

const $poll = createStore<Poll | null>(null);

export const $loading = createPollFx.pending;
export const $hasPoll = $poll.map((poll) => poll !== null);

$poll.on(createPollFx.doneData, (_, { data: { poll } }) => poll);

createPollFx.doneData.watch(({ data: { accessToken } }) => {
  const expires = new Date(
    new Date().getTime() + parseInt(import.meta.env.COOKIE_TTL),
  );

  cookies.set({
    name: "accessToken",
    value: accessToken,
    attributes: { expires },
  });
});

$poll.watch((poll) => {
  console.log(poll);
});
