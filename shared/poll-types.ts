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
}
