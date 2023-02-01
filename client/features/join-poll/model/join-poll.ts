import { pollModel } from "@entities/poll/model";
import { redirect, Routes } from "@shared/config/router";
import { rules } from "@shared/lib/validation-rules";
import { createEvent, sample } from "effector";
import { createForm } from "effector-forms";

import { JoinPollFields } from "../lib/types";

export const joinPollForm = createForm<JoinPollFields>({
  fields: {
    pollId: {
      init: "",
      rules: [rules.required(), rules.minLength(6), rules.maxLength(6)],
      validateOn: ["change"],
    },
    name: {
      init: "",
      rules: [rules.required(), rules.minLength(3)],
      validateOn: ["change"],
    },
  },
});

export const joinPoll = createEvent();

sample({
  clock: joinPoll,
  source: joinPollForm.$values,
  target: pollModel.joinPollFx,
});

redirect({
  clock: pollModel.joinPollFx.done,
  fn: () => Routes.WAITING_ROOM,
});
