import { pollsApi } from "@shared/api/polls";
import { CreatePollBody } from "@shared/api/polls/types";
import { createEffect, createStore } from "effector";
import { Poll } from "shared";

export const createPollFx = createEffect(
  async (body: CreatePollBody) => await pollsApi.createPoll(body),
);

const $poll = createStore<Poll | null>(null);

$poll.on(createPollFx.doneData, (_, { data: { poll } }) => ({ ...poll }));
