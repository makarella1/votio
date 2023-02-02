import { cookies } from "@shared/lib/cookies";
import { Poll } from "shared";
import { io, Socket } from "socket.io-client";

const HOST = import.meta.env.VITE_API_HOST as string;
const PORT = parseInt(import.meta.env.VITE_API_PORT);
const SOCKETS_NAMESPACE = import.meta.env.VITE_SOCKETS_NAMESPACE as string;

const SOCKETS_URL = `http://${HOST}:${PORT}/${SOCKETS_NAMESPACE}`;

export const getInstance = (): Socket => {
  const socket = io(SOCKETS_URL, {
    auth: {
      token: cookies.get("accessToken"),
    },
    transports: ["websockets", "polling"],
  });

  socket.on("connect", () => {
    console.log("socket connected!");
  });

  socket.on("poll_updated", (poll: Poll) => poll);

  return socket;
};
