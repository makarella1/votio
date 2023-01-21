import "./index.css";

import { CreatePollPage } from "@pages/create-poll";
import { JoinPollPage } from "@pages/join-poll";
import { WelcomePage } from "@pages/welcome";
import { Routes } from "@shared/config/router";
import { AnimatedRoute, Container } from "@shared/ui";

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
  </Container>
);

export default App;
