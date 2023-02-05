import { pollModel } from "@entities/poll/model";
import { redirect, Routes } from "@shared/config/router";
import { rules } from "@shared/lib/form";
import { createForm } from "effector-forms";

import { JoinPollFields } from "../lib/types";

export const form = createForm<JoinPollFields>({
  fields: {
    pollId: {
      init: "",
      rules: [rules.required(), rules.minLength(6), rules.maxLength(6)],
      validateOn: ["change"],
    },
    name: {
      init: "",
      rules: [rules.required(), rules.minLength(3), rules.maxLength(30)],
      validateOn: ["change"],
    },
  },
});

redirect({
  clock: pollModel.joinPollFx.done,
  fn: () => Routes.WAITING_ROOM,
});
