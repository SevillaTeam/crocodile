import React, { FC } from 'react';
import { FinishNotificationProps } from './';
import { Button } from '../Button';
import cn from 'classnames';
import s from './finish-notification.module.scss';

type Props = FinishNotificationProps;

export const FinishNotification: FC<Props> = (props) => {
  const {} = props;

  return (
    <div className={s.notification}>
      <div className={s.container}>
        <p className={s.text}>Игра окончена</p>
        <div className={s.buttons}>
          <Button
            type='button'
            disabled={false}
            styleType='contained'
            size='dense'
            text='Повторить?'
            onClick={() => console.log('Повторить игру')}
          />
          <Button
            type='button'
            disabled={false}
            styleType='contained'
            size='dense'
            text='Главное меню'
            onClick={() => console.log('Вернуться в главное меню')}
          />
        </div>
      </div>
    </div>
  );
};
