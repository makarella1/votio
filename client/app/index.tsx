import { Switch, Route } from 'wouter';

import { WelcomePage } from '@pages/welcome';
import { CreatePollPage } from '@pages/create-poll';
import { JoinPollPage } from '@pages/join-poll';

import './index.css';

const App = () => (
  <Switch>
    <Route path="/" component={WelcomePage} />
    <Route path="/create-poll" component={CreatePollPage} />
    <Route path="/join-poll" component={JoinPollPage} />
  </Switch>
);

export default App;
