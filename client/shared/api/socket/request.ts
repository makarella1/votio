import { cookies } from "@shared/lib/cookies";
import { notifications } from "@shared/lib/notifications";
import { io, Socket } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL as string;
const SOCKETS_NAMESPACE = import.meta.env.VITE_SOCKETS_NAMESPACE as string;

const SOCKETS_URL = `${API_URL}/${SOCKETS_NAMESPACE}`;

export const getInstance = (): Socket => {
  const socket = io(SOCKETS_URL, {
    auth: {
      token: cookies.get("accessToken"),
    },
    transports: ["websockets", "polling"],
  });

  socket.on("exception", () => {
    notifications.showToast({ type: "error" });
  });

  return socket;
};
