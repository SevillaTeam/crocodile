import s from './registration.module.scss';
import React, { FC } from 'react';
import { SignUpForm } from '../../components/SignUpForm';

export const Registration: FC = () => (
  <div className={s.container}>
    <SignUpForm />
  </div>
);
