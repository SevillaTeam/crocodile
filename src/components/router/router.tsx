import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import * as Pages from '../../pages';

export const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route
        path={['/', '/authorization', '/registration']}
        exact
        component={Pages.Home}
      />
      <Route path='/page-not-found' render={() => <Pages.PageNotFound />} />
      <Route path='*'>
        <Redirect to='/page-not-found' />
      </Route>
    </Switch>
  );
};
