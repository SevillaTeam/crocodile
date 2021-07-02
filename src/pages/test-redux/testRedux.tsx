import React, { FC } from 'react';
import s from './testRedux.module.scss';
import { TestReduxComp } from '../../components/TestReduxComp';

export const TestRedux: FC = () => (
  <div className={s.container}>
    <TestReduxComp />
  </div>
);
