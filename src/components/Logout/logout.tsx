import React, { FC, useState } from 'react';
import { Button } from '../Button';
import { IModalState } from './interfaces';
import s from './logout.module.scss';
import * as api from '../../services/api';
import { useHistory } from 'react-router-dom';

export const Logout: FC<IModalState> = (props) => {
  const onClose = () => {
    props.onClose();
  };

  const [logoutState, setLogoutState] = useState({
    message: '',
  });

  const history = useHistory();

  const logoutUser = () => {
    api
      .logOut()
      .then(() => {
        setLogoutState((logoutState) => ({ message: 'Успешно!' }));
        setTimeout(() => {
          onClose();
          history.push('/');
          window.location.reload();
        }, 1500);
      })
      .catch((err: { reason: string }) => {
        setLogoutState((logoutState) => ({ message: err.reason }));
        setTimeout(() => onClose(), 1500);
      });
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Выйти из приложения?</h1>
      {logoutState.message && (
        <p className={s.message}>{logoutState.message}</p>
      )}
      <div className={s.buttons}>
        <Button
          type='button'
          styleType='contained'
          color='primary'
          text='Отмена'
          size='dense'
          onClick={onClose}
        />
        <Button
          type='button'
          styleType='contained'
          color='primary'
          text='Выйти?'
          size='dense'
          onClick={logoutUser}
        />
      </div>
    </div>
  );
};
