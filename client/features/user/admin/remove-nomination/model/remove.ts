import { notifications } from "@shared/lib/notifications";
import { createEffect, sample } from "effector";

import { RemoveNominationParams } from "../lib/types";

export const removeFx = createEffect(
  ({ socket, nominationId }: RemoveNominationParams) => {
    socket.emit("remove_nomination", { nominationId });
  },
);

sample({
  clock: removeFx.done,
  target: notifications.showToastFx.prepend(() => ({
    type: "success",
    message: "Nomination Removed!",
  })),
});
