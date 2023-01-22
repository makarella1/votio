import { Poll } from "shared";

export interface APIError {
  messages: string[];
  statusCode?: number;
}

export interface RequestResponse<T> {
  data: T | Record<string, never>;
  error?: APIError;
}

export type CreatePollBody = Pick<Poll, "votesPerVoter" | "topic"> & {
  name: string;
};
