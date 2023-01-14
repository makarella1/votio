import { Request } from 'express';
import { Socket } from 'socket.io';

export interface CreatePollData {
  pollId: string;
  topic: string;
  votesPerVoter: number;
  userId: string;
}

export interface AuthPayload {
  pollId: string;
  userId: string;
  name: string;
}

export type Payload = Omit<AuthPayload, 'userId'> & { sub: string };

export type RequestWithAuth = AuthPayload & Request;
export type SocketWithAuth = AuthPayload & Socket;
