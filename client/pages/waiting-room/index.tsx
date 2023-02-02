import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import React from "react";

export const WaitingRoom = () => {
  React.useEffect(() => {
    const connectToRoom = async () => {
      const socket = await userModel.initializeConnectionFx();

      // @ts-ignore
      pollModel.listenToPollUpdatesFx(socket);
    };

    connectToRoom();
  }, []);

  return <div>waiting room</div>;
};
