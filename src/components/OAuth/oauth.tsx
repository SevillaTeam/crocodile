import React, { FC, useCallback } from 'react';
import { Button } from '../Button';
import { IModalState } from './interfaces';
import s from './oauth.module.scss';
import * as api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { REDIRECT_URI } from './constants';
const querystring = require('querystring');

export const OAuth: FC<IModalState> = (props) => {
  const onClose = () => {
    props.onClose();
  };

  const history = useHistory();

  const redirectToOAuthServer = useCallback(() => {
    const searchParamsEncoded = querystring.stringify({
      redirect_uri: REDIRECT_URI,
    });

    api
      .getCodeForOAuth(searchParamsEncoded)
      .then((res) => {
        const { service_id } = res;
        window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`;
      })
      .catch((err) => console.log(err));
  }, []);

  const authorizeLocalRecord = useCallback(() => {
    history.push('/authorization');
    setTimeout(() => onClose(), 200);
  }, []);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Авторизация</h1>

      <div className={s.buttons}>
        <Button
          type='button'
          styleType='contained'
          color='primary'
          text='Ввести login/password'
          size='dense'
          onClick={authorizeLocalRecord}
        />
        <Button
          type='button'
          styleType='contained'
          color='primary'
          text='Войти через Yandex аккаунт'
          size='dense'
          style={{ backgroundColor: '#ffdc60' }}
          onClick={redirectToOAuthServer}
        />
      </div>
    </div>
  );
};
