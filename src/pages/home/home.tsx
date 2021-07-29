import React, { useEffect } from 'react';
import s from './home.module.scss';
import { StartGameBanner } from '@components/StartGameBanner/start-game-banner';
import * as api from '../../services/api';
import { getAuthCodeFromQuery } from '../../utlis/get-auth-code-from-query';

export const Home = (): JSX.Element => {
  useEffect(() => {
    const authCode = getAuthCodeFromQuery();

    if (authCode)
      api
        .OAuthLogin({
          code: authCode,
          redirect_uri: 'https://localhost:5000',
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
  }, []);

  return (
    <div className={s.homePage}>
      <StartGameBanner />
    </div>
  );
};
