import "./index.css";

import { pollModel } from "@entities/poll/model";
import { userModel } from "@entities/user/model";
import { CreatePollPage } from "@pages/create-poll";
import { JoinPollPage } from "@pages/join-poll";
import { ResultsPage } from "@pages/results";
import { VotingPage } from "@pages/voting";
import { WaitingRoomPage } from "@pages/waiting-room";
import { WelcomePage } from "@pages/welcome";
import { Routes } from "@shared/config/router";
import { cookies } from "@shared/lib/cookies";
import { getTokenPayload } from "@shared/lib/get-token-payload";
import { Container } from "@shared/ui/container";
import { Loader } from "@shared/ui/loader";
import { Route } from "@shared/ui/route";
import { ProtectedRoute } from "@widgets/protected-route";
import { useUnit } from "effector-react";
import React from "react";
import { navigate } from "wouter/use-location";

export const App = () => {
  const loading = useUnit(pollModel.$rejoinPollLoading);
  const poll = useUnit(pollModel.$poll);
  const me = useUnit(userModel.$me);

  React.useEffect(() => {
    const reconnect = async () => {
      const token = cookies.get("accessToken");

      if (token) {
        const { name, sub } = getTokenPayload(token);

        const {
          data: { adminId },
        } = await pollModel.rejoinPollFx(token);

        await userModel.initializeConnectionFx();

        userModel.setMe({
          name,
          id: sub,
          isAdmin: sub === adminId,
        });
      }
    };

    reconnect();
  }, []);

  React.useEffect(() => {
    if (me.id && !poll.hasStarted) {
      navigate(Routes.WAITING_ROOM);
    }
  }, [me.id, poll.hasStarted]);

  React.useEffect(() => {
    if (me.id && poll.hasStarted) {
      navigate(Routes.VOTING);
    }
  }, [me.id, poll.hasStarted]);

  React.useEffect(() => {
    if (me.id && poll.rankings[me.id]) {
      navigate(Routes.RESULTS);
    }
  }, [me.id, poll.rankings]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <Route path={Routes.WELCOME}>
          <WelcomePage />
        </Route>
        <Route path={Routes.CREATE_POLL}>
          <CreatePollPage />
        </Route>
        <Route path={Routes.JOIN_POLL}>
          <JoinPollPage />
        </Route>
        <ProtectedRoute path={Routes.WAITING_ROOM} me={me}>
          <WaitingRoomPage />
        </ProtectedRoute>
        <ProtectedRoute path={Routes.VOTING} me={me}>
          <VotingPage />
        </ProtectedRoute>
        <ProtectedRoute path={Routes.RESULTS} me={me}>
          <ResultsPage />
        </ProtectedRoute>
      </Container>
    </>
  );
};

export default App;
