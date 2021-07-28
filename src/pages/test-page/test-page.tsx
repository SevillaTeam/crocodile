import React, { FC } from 'react';
import s from './test-page.module.scss';
import { WordSelector } from '../../components/WordSelector';

export const TestPage: FC = () => (
  <div className={s.container}>
    <WordSelector />
  </div>
);
