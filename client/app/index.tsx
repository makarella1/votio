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
import { Loader } from "@shared/ui/loader";
import { useUnit } from "effector-react";
import React from "react";
import { navigate } from "wouter/use-location";

export const App = () => {
  const loading = useUnit(pollModel.$rejoinPollLoading);

  React.useEffect(() => {
    const reconnect = async () => {
      const token = cookies.get("accessToken");

      if (token) {
        const { name, sub } = getTokenPayload(token);

        const {
          data: { adminId, hasStarted },
        } = await pollModel.rejoinPollFx(token);
        await userModel.initializeConnectionFx();

        userModel.setMe({
          name,
          id: sub,
          isAdmin: sub === adminId,
        });

        if (!hasStarted) {
          navigate(Routes.WAITING_ROOM);
        }
      }
    };

    reconnect();
  }, []);

  if (loading) {
    return <Loader />;
  }

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
    </>
  );
};

export default App;
