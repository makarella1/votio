import { Poll } from "shared";

export type CreatePollBody = Pick<Poll, "votesPerVoter" | "topic"> & {
  name: string;
};
