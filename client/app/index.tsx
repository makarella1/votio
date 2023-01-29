import "./index.css";

import { CreatePollPage } from "@pages/create-poll";
import { JoinPollPage } from "@pages/join-poll";
import { WaitingRoom } from "@pages/waiting-room";
import { WelcomePage } from "@pages/welcome";
import { Routes } from "@shared/config/router";
import { AnimatedRoute } from "@shared/ui/animated-route";
import { Container } from "@shared/ui/container";

const App = () => (
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
);

export default App;
