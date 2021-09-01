import React, { FC } from 'react';
import s from './login.module.scss';
import { LoginForm } from '../../components/LoginForm';

export const Login: FC = () => (
  <div className={s.container}>
    <LoginForm />
  </div>
);
