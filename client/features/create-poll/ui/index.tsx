import { pollModel } from "@entities/poll/model";
import { Loader } from "@shared/ui/loader";
import { useStore } from "effector-react";

import { CreatePollForm } from "./create-poll-form";

export const CreatePoll = () => {
  const loading = useStore(pollModel.$createPollLoading);

  if (loading) {
    return <Loader />;
  }

  return <CreatePollForm />;
};
