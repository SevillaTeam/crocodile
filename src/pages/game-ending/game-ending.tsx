import s from './game-ending.module.scss';
import React, { FC } from 'react';
import { FinishNotification } from '../../components/Finish-notification';

export const GameEnding: FC = () => (
  <div className={s.container}>
    <FinishNotification />
  </div>
);
