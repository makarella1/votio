import { ToastType } from "react-hot-toast";

export interface ShowToastParams {
  type: Omit<ToastType, "blank" | "custom">;
  message?: string;
}
