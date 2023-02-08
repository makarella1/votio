import { Socket } from "socket.io-client";

export interface RemoveNominationParams {
  socket: Socket;
  nominationId: string;
}
