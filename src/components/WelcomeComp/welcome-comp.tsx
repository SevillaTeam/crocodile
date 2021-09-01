import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../Button';
import s from './welcome-comp.module.scss';

export const WelcomeComp = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/oauth');
  };

  return (
    <div className={s.welcomeComp}>
      <h1 className={s.title}>Онлайн игра</h1>
      <h1 className={s.subtitle}>
        Один рисует, остальные отгадывают в режиме реального времени
      </h1>
      <div className={s.buttons}>
        <Button
          type='button'
          styleType='contained'
          color='primary'
          text='Играть'
          size='dense'
          styleObj={s.button}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
