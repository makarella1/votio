import { Poll } from "@votio/shared";

export type CreatePollBody = Pick<Poll, "votesPerVoter" | "topic"> & {
  name: string;
};

export interface JoinPollBody {
  name: string;
  pollId: string;
}

export interface PollResponse {
  poll: Poll;
  accessToken: string;
}
