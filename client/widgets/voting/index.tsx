import { Me } from "@entities/user/model/types";
import { Poll } from "shared";

import { SortableList } from "./sortable-list";

interface VotingProps {
  poll: Poll;
  me: Me;
}

export const Voting = ({ poll, me }: VotingProps) => {
  return (
    <div className="flex h-5/6 w-full flex-col text-center sm:h-3/4">
      <div className="mb-4 sm:mb-10">
        <h3 className="text-3xl font-black">
          Select Your Top {poll.votesPerVoter} Choices
        </h3>
        <h4 className="mb-4 hidden text-xl font-black sm:block ">
          Drag n Drop Your Favorite Options To the Top
        </h4>
        <p className="hidden sm:block">
          Your first pick weighs the most, the second one weighs a little bit
          less... You got the point, choose carefully!
        </p>
      </div>

      <SortableList poll={poll} me={me} />
    </div>
  );
};
