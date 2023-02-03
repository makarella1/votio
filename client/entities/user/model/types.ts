import { Socket } from "socket.io-client";

export interface UserConnection {
  socket?: Socket;
}

export interface Me {
  name?: string;
  id?: string;
  isAdmin?: boolean;
}
