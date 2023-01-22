import { createPoll } from "@shared/api";
import { CreatePollBody } from "@shared/api/lib/types";
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";

import { AVG_VOTES, MAX_VOTES, MIN_VOTES } from "../lib";

interface PollFields {
  name: string;
  topic: string;
}

const INITIAL_POLL_FIELDS: PollFields = { name: "", topic: "" };

const $pollForm = createStore<PollFields>(INITIAL_POLL_FIELDS);
const $votesPerVoter = createStore(AVG_VOTES, {
  updateFilter: (votesPerVoter) =>
    votesPerVoter >= MIN_VOTES && votesPerVoter <= MAX_VOTES,
});

const voteAdded = createEvent<number>();
const voteRemoved = createEvent<number>();
const handleCreatePoll = createEvent<CreatePollBody>();

$votesPerVoter.on(voteAdded, (votesPerVoter) => votesPerVoter + 1);
$votesPerVoter.on(voteRemoved, (votesPerVoter) => votesPerVoter - 1);

const createPollFx = createEffect(
  async (body: CreatePollBody) => await createPoll(body),
);

const $createPollData = combine($pollForm, $votesPerVoter);

const createPollUnit = sample({
  clock: handleCreatePoll,
  source: $createPollData,
  fn: (_, createPollBody) => ({ ...createPollBody }),
  target: createPollFx,
});

forward({
  from: createPollUnit,
  to: createPollFx,
});
