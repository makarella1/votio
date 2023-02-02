import { pollModel } from "@entities/poll/model";
import { redirect, Routes } from "@shared/config/router";
import { rules } from "@shared/lib/validation-rules";
import { combine, createEvent, createStore, sample } from "effector";
import { createForm } from "effector-forms";

import { AVG_VOTES, MAX_VOTES, MIN_VOTES } from "../lib/constants";
import { PollFields } from "../lib/types";

export const $votesPerVoter = createStore(AVG_VOTES, {
  updateFilter: (votesPerVoter) =>
    votesPerVoter >= MIN_VOTES && votesPerVoter <= MAX_VOTES,
});

export const voteAdded = createEvent();
export const voteRemoved = createEvent();

export const createPoll = createEvent();

export const pollForm = createForm<PollFields>({
  fields: {
    name: {
      init: "",
      rules: [rules.required(), rules.minLength(3)],
      validateOn: ["change"],
    },
    topic: {
      init: "",
      rules: [rules.required(), rules.minLength(3)],
      validateOn: ["change"],
    },
  },
});

$votesPerVoter.on(voteAdded, (votesPerVoter) => votesPerVoter + 1);
$votesPerVoter.on(voteRemoved, (votesPerVoter) => votesPerVoter - 1);

const $pollData = combine(
  pollForm.$values,
  $votesPerVoter,
  (pollForm, votesPerVoter) => ({ ...pollForm, votesPerVoter }),
);

sample({
  clock: createPoll,
  source: $pollData,
  target: pollModel.createPollFx,
});

redirect({
  clock: pollModel.createPollFx.done,
  fn: () => Routes.WAITING_ROOM,
});