import s from './user-leader-box.module.scss';
import React from 'react';
import Avatar from '../../assets/icons/useravatar.svg';

interface LeaderBoxProps {
  position: number;
  name: string;
  points: number;
}

export const LeaderBox: React.FC<LeaderBoxProps> = ({
  position,
  name,
  points,
}) => (
  <div className={s.leaderBox}>
    <span className={s.index}>{position}</span>
    <img className={s.avatar} src={Avatar} alt='user avatar' />
    <span className={s.userName}>{name}</span>
    <span className={s.points}>{points}</span>
  </div>
);
