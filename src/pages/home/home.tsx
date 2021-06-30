import React from 'react';
import s from './home.module.scss';
import { LoginForm } from '../../components/LoginForm';

export const Home = (): JSX.Element => {
  return (
    <div className={s.homePage}>
      <LoginForm />
    </div>
  );
};
