import { pollModel } from "@entities/poll/model";
import { Routes } from "@shared/config/router";
import { Loader } from "@shared/ui/loader";
import { useStore } from "effector-react";
import { Redirect } from "wouter";

import { CreatePollForm } from "./create-poll-form";

export const CreatePoll = () => {
  const loading = useStore(pollModel.$loading);
  const pollCreated = useStore(pollModel.$hasPoll);

  if (loading) {
    return <Loader />;
  }

  if (pollCreated) {
    return <Redirect to={Routes.WELCOME} />;
  }

  return <CreatePollForm />;
};
