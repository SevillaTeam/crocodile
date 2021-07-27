import React, { FC } from 'react';
import s from './test-page.module.scss';
import * as api from '../../services/api';
import { Button } from '@components/Button';

export const TestPage: FC = () => {
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

  const handleClickGetAllLeaderboard = () => {
    api.getAllLeaderboard({
      cursor: 0,
      limit: 100,
      ratingFieldName: 'score',
    });
  };

  return (
    <div className={s.container}>
      <div className={s.buttons}>
        <Button
          text='AddUserToLeaderboard'
          type='button'
          styleType='contained'
          size='dense'
          onClick={handleClickAddUserToLeaderboard}
        />
        <Button
          text='GetAllLeaderboard'
          type='button'
          styleType='contained'
          size='dense'
          onClick={handleClickGetAllLeaderboard}
        />
      </div>
    </div>
  );
};
