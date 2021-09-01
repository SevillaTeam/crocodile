import React, { FC } from 'react';
import s from './game-players.module.scss';
import { playersMock } from './mock';
import { PLAYER_ROLE } from './constants';

interface Props {
  videoTracks: MediaStream[]
}

export const GamePlayers: FC<Props> = ({videoTracks = []}) => {
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

  console.log('videoTracks in game',videoTracks)

  return (
      <div className={s.gamePlayers} id="video-container">
        <video id="video" width="210px" height="160px" autoPlay={true}/>
      </div>
  );
};
