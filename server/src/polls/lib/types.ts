export interface CreatePollData {
  pollId: string;
  topic: string;
  votesPerVoter: number;
  userId: string;
}

export interface AddVoterData {
  pollId: string;
  userId: string;
  name: string;
}
