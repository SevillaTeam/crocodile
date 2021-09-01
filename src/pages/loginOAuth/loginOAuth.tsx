import React, { FC } from 'react';
import s from './login.module.scss';
import { OAuth } from '@components/OAuth';

export const LoginOAuth: FC = () => (
  <div className={s.container}>
    <OAuth />
  </div>
);
