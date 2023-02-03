import { createEffect } from "effector";
import { toast } from "react-hot-toast";

import { ShowToastParams } from "./types";

export const showToastFx = createEffect(({ type }: ShowToastParams) =>
  type === "error"
    ? toast.error("Something went wrong...")
    : toast.success("Everything went smoothly!"),
);
