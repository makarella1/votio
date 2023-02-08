import { rules } from "@shared/lib/form";
import { notifications } from "@shared/lib/notifications";
import { createEffect, sample } from "effector";
import { createForm } from "effector-forms";

import { NominationFields, NominationParams } from "../lib/types";

export const $nominationForm = createForm<NominationFields>({
  fields: {
    text: {
      init: "",
      rules: [rules.required(), rules.minLength(2), rules.maxLength(100)],
      validateOn: ["change"],
    },
  },
});

export const nominateFx = createEffect(({ socket, text }: NominationParams) => {
  socket.emit("nominate", { text });
});

sample({
  clock: nominateFx.done,
  target: notifications.showToastFx.prepend(() => ({ type: "success" })),
});
