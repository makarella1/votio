import { Poll } from "@votio/shared";

import { request } from "../lib/request";
import { CreatePollBody, JoinPollBody, PollResponse } from "./types";

export const createPoll = async (body: CreatePollBody) =>
  await request<PollResponse>("/polls", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const joinPoll = async (body: JoinPollBody) =>
  await request<PollResponse>("/polls/join", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const rejoinPoll = async (accessToken: string) =>
  await request<Poll>("/polls/rejoin", {
    method: "POST",
    body: JSON.stringify({ accessToken }),
  });
