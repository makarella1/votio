import { Poll } from "shared";

export type CreatePollBody = Pick<Poll, "votesPerVoter" | "topic"> & {
  name: string;
};

export interface JoinPollBody {
  name: string;
  pollId: string;
}

export interface Response {
  poll: Poll;
  accessToken: string;
}
