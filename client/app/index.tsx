import "./index.css";

import { CreatePollPage } from "@pages/create-poll";
import { JoinPollPage } from "@pages/join-poll";
import { WaitingRoom } from "@pages/waiting-room";
import { WelcomePage } from "@pages/welcome";
import { Routes } from "@shared/config/router";
import { cookies } from "@shared/lib/cookies";
import { AnimatedRoute } from "@shared/ui/animated-route";
import { Container } from "@shared/ui/container";
import React from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  React.useEffect(() => {
    const token = cookies.get("accessToken");

    if (token) {
      const { sub, name, pollId } = cookies.getTokenPayload(token);
    }
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
