import { Me } from "@entities/user/model/types";
import { Poll } from "shared";

import { SortableList } from "./sortable-list";

interface VotingProps {
  poll: Poll;
  me: Me;
}

export const Voting = ({ poll, me }: VotingProps) => {
  return (
    <div className="flex h-3/4 w-full flex-col text-center">
      <div className="mb-10">
        <h3 className="text-3xl font-black">
          Select Your Top {poll.votesPerVoter} Choices
        </h3>
        <h4 className="mb-4 text-xl font-black">
          Drag n Drop Your Favorite Options To the Top
        </h4>
        <p>
          Your first pick weighs the most, the second one weighs a little bit
          less... You got the point, choose carefully!
        </p>
      </div>

      <SortableList poll={poll} me={me} />
    </div>
  );
};
