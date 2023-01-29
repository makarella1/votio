import { request } from "../lib/request";
import { CreatePollBody, JoinPollBody, Response } from "./types";

export const createPoll = async (body: CreatePollBody) =>
  await request<Response>("/polls", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const joinPoll = async (body: JoinPollBody) =>
  await request<Response>("/polls/join", {
    method: "POST",
    body: JSON.stringify(body),
  });
