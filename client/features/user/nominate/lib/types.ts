import { Socket } from "socket.io-client";

export interface NominationFields {
  text: string;
}

export interface NominationParams {
  socket: Socket;
  text: string;
}
