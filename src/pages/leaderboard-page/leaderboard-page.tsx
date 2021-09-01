import React, { FC, useEffect } from 'react';
import s from './leaderboard-page.module.scss';
import * as api from '../../services/api';
import { Button } from '@components/Button';
import { Leaderboard } from '@components/Leaderboard';
import { IResponseLiderboard } from '../../services/interfaces';

export const LeaderboardPage: FC = () => {
  useEffect(() => {
    api
      .getAllLeaderboard({
        cursor: 0,
        limit: 100,
        ratingFieldName: 'score',
      })
      .then((res: IResponseLiderboard) => {
        console.log(res);
      })
      .catch((err: { reason: string }) => {
        console.log(err);
      });
  }, []);

  const handleClickAddUserToLeaderboard = () => {
    api.addToLeaderboard({
      data: {
        user_id: 10,
        display_name: 'Vasiya',
        score: 16,
      },
      ratingFieldName: 'score',
    });
  };

  return (
    <div className={s.container}>
      <Leaderboard />
      <div className={s.buttons}>
        <Button
          text='AddCurrentUserToLeaderboard'
          type='button'
          styleType='contained'
          size='dense'
          onClick={handleClickAddUserToLeaderboard}
        />
      </div>
    </div>
  );
};
