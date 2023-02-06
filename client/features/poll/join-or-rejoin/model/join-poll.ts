import { pollModel } from "@entities/poll/model";
import { redirect, Routes } from "@shared/config/router";
import { rules } from "@shared/lib/form";
import { notifications } from "@shared/lib/notifications";
import { sample } from "effector";
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

sample({
  clock: pollModel.joinPollFx.done,
  target: notifications.showToastFx.prepend(() => ({
    type: "success",
    message: "Joined Successfully!",
  })),
});

sample({
  clock: pollModel.joinPollFx.fail,
  target: notifications.showToastFx.prepend(() => ({
    type: "error",
    message: "Failed to Join!",
  })),
});

sample({
  clock: pollModel.rejoinPollFx.done,
  target: notifications.showToastFx.prepend(() => ({
    type: "success",
    message: "Reconnected!",
  })),
});

sample({
  clock: pollModel.connectionFailed,
  target: notifications.showToastFx.prepend(() => ({
    type: "error",
    message: "Can't Connect to Your Previous Poll!",
  })),
});

redirect({
  clock: pollModel.connectionFailed,
  fn: () => Routes.WELCOME,
});

redirect({
  clock: pollModel.joinPollFx.done,
  fn: () => Routes.WAITING_ROOM,
});
