import React, { FC } from 'react';
import s from './game-player.module.scss';
import { IGamePlayerProps } from './interfaces';
import { urlApiResources } from '../../services/constants';

export const GamePlayer: FC<IGamePlayerProps> = (props) => {
  const { playerName, playerAvatar, showAvatar = true } = props;
  return (
    <div className={s.gamePlayer}>
      {showAvatar && playerAvatar && (
        <div
          className={s.avatar}
          style={{
            backgroundImage: `url(${urlApiResources}${playerAvatar})`,
            backgroundSize: 'cover',
          }}
        />
      )}
      {showAvatar && !playerAvatar && <div className={s.avatar} />}
      <p className={s.name}>{playerName}</p>
    </div>
  );
};
