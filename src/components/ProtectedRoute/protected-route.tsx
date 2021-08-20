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
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirect_path} />
        );
      }}
    ></Route>
  );
};
export const ProtectedRoute = connector(ProtectedRouteComp);
