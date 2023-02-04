import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { useUnit } from "effector-react";
import React from "react";

export const WaitingRoom = () => {
  const userConnection = useUnit(userModel.$userConnection);

  React.useEffect(() => {
    const connectToRoom = async () => {
      if (!userConnection.socket) {
        const socket = await userModel.initializeConnectionFx();

        // @ts-expect-error bad typings for sockets
        pollModel.listenToPollUpdatesFx(socket);
      } else {
        // @ts-expect-error bad typings for sockets
        pollModel.listenToPollUpdatesFx(userConnection.socket);
      }
    };

    connectToRoom();
  }, []);

  return <div>waiting room</div>;
};
