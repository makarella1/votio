import { pollModel } from "@entities/poll/model";
import { combine, createEvent, createStore, sample } from "effector";

import { AVG_VOTES, MAX_VOTES, MIN_VOTES } from "../lib/constants";

interface PollFields {
  name: string;
  topic: string;
}

const INITIAL_POLL_FIELDS: PollFields = { name: "", topic: "" };

export const $pollForm = createStore<PollFields>(INITIAL_POLL_FIELDS);

export const $votesPerVoter = createStore(AVG_VOTES, {
  updateFilter: (votesPerVoter) =>
    votesPerVoter >= MIN_VOTES && votesPerVoter <= MAX_VOTES,
});

export const voteAdded = createEvent();
export const voteRemoved = createEvent();
export const pollCreated = createEvent();

$votesPerVoter.on(voteAdded, (votesPerVoter) => votesPerVoter + 1);
$votesPerVoter.on(voteRemoved, (votesPerVoter) => votesPerVoter - 1);

const $pollData = combine(
  $pollForm,
  $votesPerVoter,
  (pollForm, votesPerVoter) => ({ ...pollForm, votesPerVoter }),
);

sample({
  clock: pollCreated,
  source: $pollData,
  target: pollModel.createPollFx,
});
