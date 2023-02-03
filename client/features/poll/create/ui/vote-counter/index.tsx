import { createPollModel } from "@features/poll/create/model";
import { Button } from "@shared/ui/button";
import { useStore } from "effector-react";

interface VoteCounterProps {
  min: number;
  max: number;
}

export const VoteCounter = ({ min, max }: VoteCounterProps) => {
  const votesPerVoter = useStore(createPollModel.$votesPerVoter);

  const handleVoteAdd = () => {
    createPollModel.voteAdded();
  };

  const handleVoteRemove = () => {
    createPollModel.voteRemoved();
  };

  return (
    <div>
      <p>Votes Per Voter</p>
      <div className="flex w-full items-center justify-between">
        <Button
          className="w-20 text-xl"
          variant="primary-outlined"
          onClick={handleVoteRemove}
          disabled={votesPerVoter <= min}
          type="button"
        >
          -
        </Button>
        <p className="w-10 font-black">{votesPerVoter}</p>
        <Button
          className="w-20 text-xl"
          variant="secondary-outlined"
          onClick={handleVoteAdd}
          disabled={votesPerVoter >= max}
          type="button"
        >
          +
        </Button>
      </div>
    </div>
  );
};
