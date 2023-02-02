import { $joinPollLoading } from "@entities/poll/model/poll";
import { JoinPoll } from "@features/join-poll/ui";
import { Loader } from "@shared/ui/loader";
import { useStore } from "effector-react";

export const JoinPollPage = () => {
  const loading = useStore($joinPollLoading);

  if (loading) {
    return <Loader />;
  }

  return <JoinPoll />;
};
