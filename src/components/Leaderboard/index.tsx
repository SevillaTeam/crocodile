import React, { useEffect } from 'react';
import { LeaderBox } from '../LeaderBox';
import s from './leaderboard.module.scss';
import { Lead } from './types';

function sortLeaders(leads: Lead[]) {
  return leads.sort((a, b) => (a.score > b.score ? -1 : 1));
}

export const Leaderboard: React.FC<{leaders: Lead[]}> = ({ leaders }) => {
  useEffect(() => {
    sortLeaders(leaders)
  }, [leaders]) ;

  return (
    <div className={s.leaderboard}>
      {leaders.map(({ name, score }, idx) => (
        <LeaderBox key={name} position={idx + 1} name={name} points={score} />
      ))}
    </div>
  );
};
