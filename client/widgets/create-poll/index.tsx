import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { createPollModel } from "@features/poll/create/model";
import { CreatePollForm } from "@features/poll/create/ui/form";
import { cookies } from "@shared/lib/cookies";
import { Loader } from "@shared/ui/loader";
import { useUnit } from "effector-react";

export const CreatePoll = () => {
  const loading = useUnit(pollModel.$createPollLoading);
  const pollData = useUnit(createPollModel.$pollData);
  const poll = useUnit(pollModel.$poll);

  const submitForm = async () => {
    const {
      data: { accessToken },
    } = await pollModel.createPollFx(pollData);

    const { name, sub } = cookies.getTokenPayload(accessToken);

    console.log("adminId", poll?.adminId);
    console.log("userId", sub);

    userModel.setMe({ name, id: sub, isAdmin: poll?.adminId === sub });
  };

  if (loading) {
    return <Loader />;
  }

  return <CreatePollForm onSubmit={submitForm} />;
};
