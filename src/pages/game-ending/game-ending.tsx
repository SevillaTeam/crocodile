import s from './game-ending.module.scss';
import React, { FC, useEffect } from 'react';
import * as api from '../../services/api';
import { FinishNotification } from '../../components/Finish-notification';
import { connector } from './container';
import { IResponseUserState } from '@/components/LoginForm/redux-sagas/interfaces';

type Props = {
  userData?: IResponseUserState;
};

const updateLeaderboard = (props: Props) => {
  let score = 0
  async function getScoreData() {
    const data = await api.getAllLeaderboard({
      cursor: 0,
      limit: 100,
      ratingFieldName: 'score',
    })

    if (Array.isArray(data)) {
      for (const leader of data) {
        if (leader.data?.user_id === props.userData?.id) {
          score = leader.data?.score ?? 0
        }
      }
    }
  }

  async function updateLeaderboardData() {
    await api.addToLeaderboard({
      data: {
        user_id: props.userData?.id,
        name: props.userData?.display_name ?? 'anonymous',
        score: ++score,
      },
      ratingFieldName: 'score',
      teamName: 'sevilla'
    });
  }

  getScoreData()
  updateLeaderboardData()
}

const GameEndingComponent: FC<Props> = (props) => {
  useEffect(() => {
    updateLeaderboard(props)
  }, [])

  return (
    <div className={s.container}>
      <FinishNotification />
    </div>
  )
};

export const GameEnding = connector(GameEndingComponent);