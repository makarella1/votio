export interface Nomination {
  userId: string;
  text: string;
}

type NominationId = string;

export interface Nominations {
  [nominationId: NominationId]: Nomination;
}

export interface Rankings {
  [userId: string]: NominationId[];
}

export type Results = Array<{
  nominationId: NominationId;
  nominationText: string;
  score: number;
}>;

export interface Voters {
  [voterId: string]: string;
}

export interface Poll {
  id: string;
  topic: string;
  votesPerVoter: number;
  voters: Voters;
  adminId: string;
  hasStarted: boolean;
  nominations: Nominations;
  rankings: Rankings;
  results: Results;
}
