import { Socket } from "socket.io-client";

export interface RemoveVoterParams {
  socket: Socket;
  voterId: string;
}
