import { Request } from 'express';
import { Nomination } from 'shared';
import { Socket } from 'socket.io';

export interface CreatePollData {
  pollId: string;
  topic: string;
  votesPerVoter: number;
  userId: string;
}

export interface AddNominationData {
  pollId: string;
  nominationId: string;
  nomination: Nomination;
}

export interface AddRankingsData {
  pollId: string;
  userId: string;
  rankings: string[];
}

export type AddRankingsFields = AddRankingsData;

export interface AddNominationFields {
  pollId: string;
  userId: string;
  text: string;
}

export interface AuthPayload {
  pollId: string;
  userId: string;
  name: string;
}

export type Payload = Omit<AuthPayload, 'userId'> & { sub: string };

export type RequestWithAuth = AuthPayload & Request;
export type SocketWithAuth = AuthPayload & Socket;
