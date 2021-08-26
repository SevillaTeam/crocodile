import React, { FC, Component } from 'react';
import { connector } from './container';
import { Route, Redirect } from 'react-router-dom';

interface IProps {
  exact?: boolean;
  path: string;
  redirect_path: string;
  component: React.ComponentType<any>;
  isLoggedIn?: boolean;
}

const ProtectedRouteComp: FC<IProps> = ({
  component: Component,
  isLoggedIn,
  redirect_path,
  ...rest
}: any) => {
  return isLoggedIn ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to={redirect_path} />
  );
};
export const ProtectedRoute = connector(ProtectedRouteComp);
