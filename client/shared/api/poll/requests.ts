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
