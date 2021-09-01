import React, { FC, useCallback } from 'react';
import { Button } from '../Button';
import { IModalState } from './interfaces';
import s from './oauth.module.scss';
import * as api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { REDIRECT_URI } from './constants';
import cn from 'classnames';
const querystring = require('querystring');

export const OAuth: FC<IModalState> = (props) => {
  const onClose = () => {
    if (props.onClose) props.onClose();
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

  return (
    <div className={s.container}>
      <h1 className={s.title}>Авторизация</h1>
      <p className={s.subtitle}>войти через Yandex аккаунт</p>
      <div className={s.buttons}>
        <Button
          type='button'
          styleType='contained'
          color='primary'
          text='Войти'
          size='dense'
          onClick={redirectToOAuthServer}
        />
      </div>
    </div>
  );
};
