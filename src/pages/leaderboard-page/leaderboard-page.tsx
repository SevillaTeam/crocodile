import React, { FC, useEffect, useState } from 'react';
import s from './leaderboard-page.module.scss';
import * as api from '../../services/api';
import { Leaderboard } from '@components/Leaderboard';
import { IApiClientResponse, IResponseLeaderboard } from '../../services/interfaces';
import { Lead } from '@/components/Leaderboard/types';

export const LeaderboardPage: FC = () => {
  const [leaders, setLeaders] = useState<Lead[]>([])

  useEffect(() => {
    api
      .getAllLeaderboard({
        cursor: 0,
        limit: 100,
        ratingFieldName: 'score',
      })
      .then((res: IApiClientResponse | IResponseLeaderboard[]) => {
        if (Array.isArray(res)) {
          const leadArr: Lead[] = res.map(v => {
            return {
              name: v.data?.name ?? 'anonymous',
              score: v.data?.score ?? 0,
            }
          })
          setLeaders(leadArr)
        }
      })
      .catch((err: { reason: string }) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={s.container}>
      <Leaderboard leaders={leaders} />
    </div>
  );
};
