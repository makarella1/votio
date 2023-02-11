import { createEffect } from "effector";
import { toast } from "react-hot-toast";

import { ShowToastParams } from "./types";

export const showToast = ({ type, message }: ShowToastParams) =>
  type === "error"
    ? toast.error(message ?? "Something went wrong...", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      })
    : toast.success(message ?? "Everything went smoothly!", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });

export const showToastFx = createEffect(showToast);
