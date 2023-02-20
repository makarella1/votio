import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { leaveModel } from "@features/user/leave";
import { Loader } from "@shared/ui/loader";
import { WaitingRoom } from "@widgets/waiting-room";
import { useUnit } from "effector-react";
import React from "react";
import { Poll } from "shared";

export const WaitingRoomPage = () => {
  const me = useUnit(userModel.$me);
  const userConnection = useUnit(userModel.$userConnection);
  const pollLoading = useUnit(pollModel.$pollLoading);
  const poll = useUnit(pollModel.$poll);

  React.useEffect(() => {
    const connectToRoom = async () => {
      const socket = await userModel.initializeConnectionFx();

      // @ts-expect-error bad typings for sockets
      pollModel.listenToPollUpdatesFx(socket);
    };

    connectToRoom();
  }, []);

  React.useEffect(() => {
    const leavePoll = async () => {
      if (me.id && !poll.voters[me.id] && userConnection.socket?.connected) {
        await leaveModel.leaveFx(userConnection.socket);
      }
    };

    leavePoll();
  }, [poll.voters]);

  if (pollLoading || Object.keys(poll).length === 0) {
    return <Loader />;
  }

  return <WaitingRoom poll={poll as Poll} me={me} />;
};
