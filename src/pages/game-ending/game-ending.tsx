import s from './game-ending.module.scss';
import React, { FC, useEffect } from 'react';

import { FinishNotification } from '../../components/Finish-notification';
import { connector } from './container';

const GameEndingComponent: FC = () => {
  return (
    <div className={s.container}>
      <FinishNotification />
    </div>
  )
};

export const GameEnding = connector(GameEndingComponent);