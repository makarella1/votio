import "./index.css";

import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { CreatePollPage } from "@pages/create-poll";
import { JoinPollPage } from "@pages/join-poll";
import { WaitingRoom } from "@pages/waiting-room";
import { WelcomePage } from "@pages/welcome";
import { Routes } from "@shared/config/router";
import { cookies } from "@shared/lib/cookies";
import { getTokenPayload } from "@shared/lib/get-token-payload";
import { AnimatedRoute } from "@shared/ui/animated-route";
import { Container } from "@shared/ui/container";
import { useUnit } from "effector-react";
import React from "react";
import { Toaster } from "react-hot-toast";
import { navigate } from "wouter/use-location";

const App = () => {
  const currentPoll = useUnit(pollModel.$poll);
  const me = useUnit(userModel.$me);

  React.useEffect(() => {
    const reconnect = async () => {
      const token = cookies.get("accessToken");

      if (token) {
        await userModel.initializeConnectionFx();

        const { name, sub } = getTokenPayload(token);

        userModel.setMe({
          name,
          id: sub,
          isAdmin: sub === currentPoll?.adminId,
        });

        if (me?.id && !currentPoll?.hasStarted) {
          navigate(Routes.WAITING_ROOM);
        }
      }
    };

    reconnect();
  }, []);

  return (
    <>
      <Container>
        <AnimatedRoute path={Routes.WELCOME}>
          <WelcomePage />
        </AnimatedRoute>
        <AnimatedRoute path={Routes.CREATE_POLL}>
          <CreatePollPage />
        </AnimatedRoute>
        <AnimatedRoute path={Routes.JOIN_POLL}>
          <JoinPollPage />
        </AnimatedRoute>
        <AnimatedRoute path={Routes.WAITING_ROOM}>
          <WaitingRoom />
        </AnimatedRoute>
      </Container>
      <Toaster />
    </>
  );
};

export default App;
