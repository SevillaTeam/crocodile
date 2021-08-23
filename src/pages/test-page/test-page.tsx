import React, { FC } from 'react';
import s from './test-page.module.scss';
import { TestThemes } from '../../components/TestThemes';

export const TestPage: FC = () => (
  <div className={s.container}>
    <TestThemes />
  </div>
);
