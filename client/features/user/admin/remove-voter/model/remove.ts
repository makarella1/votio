import { notifications } from "@shared/lib/notifications";
import { createEffect, sample } from "effector";

import { RemoveVoterParams } from "../lib/types";

export const removeFx = createEffect(
  ({ socket, voterId }: RemoveVoterParams) => {
    socket.emit("remove_voter", { id: voterId });
  },
);

sample({
  clock: removeFx.done,
  target: notifications.showToastFx.prepend(() => ({
    type: "success",
    message: "Voter Removed!",
  })),
});
