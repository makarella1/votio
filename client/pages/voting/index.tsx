import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { Loader } from "@shared/ui/loader";
import { Voting } from "@widgets/voting";
import { useUnit } from "effector-react";
import { Poll } from "shared";

export const VotingPage = () => {
  const poll = useUnit(pollModel.$poll);
  const me = useUnit(userModel.$me);

  if (Object.keys(poll).length === 0 || !me.id) {
    return <Loader />;
  }

  return <Voting me={me} poll={poll as Poll} />;
};