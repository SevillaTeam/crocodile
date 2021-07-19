import React, { FC } from 'react';
import s from './game-players.module.scss'

export const GamePlayers: FC = () => {
  return (
    <div className={s.gamePlayers}>
      <div>Вася</div>
      <div>Вася</div>
      <div>Вася</div>
      <div>Вася</div>
    </div>
  );
};
