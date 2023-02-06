import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { joinPollModel } from "@features/poll/join-or-rejoin/model";
import { JoinPollForm } from "@features/poll/join-or-rejoin/ui/form";
import { getTokenPayload } from "@shared/lib/get-token-payload";
import { Loader } from "@shared/ui/loader";
import { useForm } from "effector-forms";
import { useUnit } from "effector-react";

export const JoinPoll = () => {
  const loading = useUnit(pollModel.$joinPollLoading);
  const joinPollForm = useForm(joinPollModel.form);

  const submitForm = async () => {
    const {
      data: { accessToken, poll },
    } = await pollModel.joinPollFx(joinPollForm.values);

    const { name: userName, sub } = getTokenPayload(accessToken);

    userModel.setMe({
      name: userName,
      id: sub,
      isAdmin: poll.adminId === sub,
    });
  };

  if (loading) {
    return <Loader />;
  }

  return <JoinPollForm onSubmit={submitForm} />;
};
