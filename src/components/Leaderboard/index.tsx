import React from 'react';
import { LeaderBox } from '../LeaderBox';
import s from './leaderboard.module.scss';
import { Lead } from './types';

function sortLeaders(leads: Lead[]) {
  return leads.sort((a, b) => (a.score > b.score ? -1 : 1));
}

export const Leaderboard: React.FC<{leaders: Lead[]}> = ({ leaders }) => {
  const sortedLeaders = sortLeaders([...leaders]);

  if (sortedLeaders.length === 0) {
    return (
      <div className={s.leaderboard}>
        <p className={s.empty}>Данных пока нет :(</p>
      </div>
    )
  }

  return (
    <div className={s.leaderboard}>
      {sortedLeaders.map(({ name, score }, idx) => (
        <LeaderBox key={name} position={idx + 1} name={name} points={score} />
      ))}
    </div>
  );
};
