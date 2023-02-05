import { createEffect } from "effector";
import { toast } from "react-hot-toast";

import { ShowToastParams } from "./types";

export const showToast = ({ type, message }: ShowToastParams) =>
  type === "error"
    ? toast.error(message ?? "Something went wrong...")
    : toast.success(message ?? "Everything went smoothly!");

export const showToastFx = createEffect(showToast);
