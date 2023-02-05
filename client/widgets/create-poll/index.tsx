import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { createPollModel } from "@features/poll/create/model";
import { CreatePollForm } from "@features/poll/create/ui/form";
import { getTokenPayload } from "@shared/lib/get-token-payload";
import { Loader } from "@shared/ui/loader";
import { useUnit } from "effector-react";

export const CreatePoll = () => {
  const loading = useUnit(pollModel.$createPollLoading);
  const pollData = useUnit(createPollModel.$pollData);

  const submitForm = async () => {
    const {
      data: { accessToken, poll },
    } = await pollModel.createPollFx(pollData);

    const { name, sub } = getTokenPayload(accessToken);

    userModel.setMe({ name, id: sub, isAdmin: poll.adminId === sub });
  };

  if (loading) {
    return <Loader />;
  }

  return <CreatePollForm onSubmit={submitForm} />;
};
