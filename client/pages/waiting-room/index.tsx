import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import React from "react";

export const WaitingRoom = () => {
  React.useEffect(() => {
    const connectToRoom = async () => {
      const socket = await userModel.initializeConnectionFx();

      // @ts-expect-error bad typings for sockets
      pollModel.listenToPollUpdatesFx(socket);
    };

    connectToRoom();
  }, []);

  return <div>waiting room</div>;
};
