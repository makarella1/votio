import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { Loader } from "@shared/ui/loader";
import { Poll } from "@votio/shared";
import { Results } from "@widgets/results";
import { useUnit } from "effector-react";

export const ResultsPage = () => {
  const poll = useUnit(pollModel.$poll);
  const me = useUnit(userModel.$me);

  if (!me.id || Object.keys(poll).length === 0) {
    return <Loader />;
  }

  return <Results poll={poll as Poll} me={me} />;
};
