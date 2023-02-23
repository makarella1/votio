import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { Container } from "@shared/ui/container";
import { Loader } from "@shared/ui/loader";
import { Poll } from "@votio/shared";
import { Voting } from "@widgets/voting";
import { useUnit } from "effector-react";

export const VotingPage = () => {
  const poll = useUnit(pollModel.$poll);
  const me = useUnit(userModel.$me);

  if (Object.keys(poll).length === 0 || !me.id) {
    return <Loader />;
  }

  return (
    <Container>
      <Voting me={me} poll={poll as Poll} />
    </Container>
  );
};
