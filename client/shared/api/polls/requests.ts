import { Poll } from "shared";

import { request } from "../lib/request";
import { CreatePollBody } from "./types";

export const createPoll = async (body: CreatePollBody) =>
  await request<{ poll: Poll; accessToken: string }>("/polls", {
    method: "POST",
    body: JSON.stringify(body),
  });
