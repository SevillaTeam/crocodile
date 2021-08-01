import React, { FC } from 'react';
import s from './game-players.module.scss';
import { GamePlayer } from '../GamePlayer';
import { playersMock } from './mock';
import { PLAYER_ROLE } from './constants';

export const GamePlayers: FC = () => {
  const takeArtist = () => {
    return playersMock.filter((item) => {
      if (item.playerRole === PLAYER_ROLE.artist) return item;
    });
  };

  const takeGuessers = () => {
    return playersMock.filter((item) => {
      if (item.playerRole === PLAYER_ROLE.guesser) return item;
    });
  };

  const takeGuessersResult = takeGuessers();

  return (
    <div className={s.gamePlayers}>
      <p className={s.roles}>Художник</p>
      {takeArtist().length > 0 ? (
        takeArtist().map((item, index) => (
          <GamePlayer key={index} playerName={item.playerName} />
        ))
      ) : (
        <GamePlayer showAvatar={false} playerName={'В пути...'} />
      )}
      <div className={s.line} />
      <p className={s.roles}>Отгадывают</p>
      {takeGuessersResult.length > 0 ? (
        takeGuessersResult.map((item, index) => (
          <GamePlayer key={index} playerName={item.playerName} />
        ))
      ) : (
        <GamePlayer showAvatar={false} playerName={'В пути...'} />
      )}
    </div>
  );
};
