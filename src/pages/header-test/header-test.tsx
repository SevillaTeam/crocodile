import React, { FC } from 'react';
import s from './header-test.module.scss';
import { Header } from '../../components/Header';

export const HeaderTest: FC = () => (
  <div className={s.container}>
    <Header />
  </div>
);
