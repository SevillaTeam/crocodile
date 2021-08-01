import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import * as Pages from '../../pages';

export const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route path={'/'} exact component={Pages.Home} />
      <Route path={'/authorization'} exact component={Pages.Login} />
      <Route path={'/registration'} exact component={Pages.Registration} />
      <Route path={'/game'} exact component={Pages.Game} />
      <Route path={'/forum'} exact component={Pages.Forum} />
      <Route path={'/forum/:topicId'} component={Pages.ForumTopic} />
      <Route path={'/header-test'} exact component={Pages.HeaderTest} />
      <Route path={'/game-ending'} exact component={Pages.GameEnding} />
      <Route path={'/test-redux'} exact component={Pages.TestRedux} />
      <Route path={'/test-page'} exact component={Pages.TestPage} />
      <Route path={'/leaderboard'} exact component={Pages.LeaderboardPage} />
      <Route path='/page-not-found' render={() => <Pages.PageNotFound />} />
      <Route path='*'>
        <Redirect to='/page-not-found' />
      </Route>
    </Switch>
  );
};
