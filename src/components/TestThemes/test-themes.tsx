import React, { FC, useContext } from 'react';
import {
  CreateRequestUserTheme,
  FindRequest,
  CreateUserRequest,
} from '../../server-ssr/controllers/interface';
import { Button } from '../Button';
import s from './test-themes.module.scss';
import { connector } from './container';

import { IApplicationState } from '@/store/interfaces';
import * as themesApi from '../../server-ssr/themes-api';
import { ThemeContext } from '@/context';

const queryString = require('query-string');

interface isLoggedIn {
  isLoggedIn: boolean;
}

interface ISelection {
  state: IApplicationState;
  changeUserLoggedInStatus: (data: isLoggedIn) => void;
}

export const TestThemes1: FC<ISelection> = (props) => {
  const { state, changeUserLoggedInStatus } = props;
  const { theme, setTheme } = useContext(ThemeContext);

  const getTheme = async (requestedData?: FindRequest) => {
    const queryStr = `/?${queryString.stringify({
      ownerId: 100500,
      title: 'Темка 3',
    })}`;

    themesApi
      .getSiteThemeByOwnerId(queryStr)
      .then((response) => {
        console.log('response(getSiteTheme)=', response);
      })
      .catch((err) => console.log(err));
  };

  const createTheme = async (requestedData?: FindRequest) => {
    const bodyToSend = {
      theme: 'Темка 1',
      description: 'Юзать всегда5',
    };

    themesApi
      .createSiteTheme(bodyToSend)
      .then((response) => {
        console.log('response(createSiteTheme)=', response);
      })
      .catch((err) => console.log(err));
  };

  const handleClickGetSomeTheme = () => {
    getTheme();
  };

  const handleClickCreateSomeTheme = () => {
    createTheme();
  };

  const getUserTheme = async (requestedData?: FindRequest) => {
    const queryStr = `/?${queryString.stringify({
      ownerId: 100500,
      title: 'Темка 3',
    })}`;

    themesApi
      .getUserTheme(queryStr)
      .then((response) => {
        console.log('response(getUserTheme)=', response);
      })
      .catch((err) => console.log(err));
  };

  const createUserTheme = async (requestedData?: CreateRequestUserTheme) => {
    const bodyToSend = {
      themeId: 3,
      theme: 'Темка 4',
      ownerId: 100500,
    };
    themesApi
      .createUserTheme(bodyToSend)

      .then((response) => {
        console.log('response(createUserTheme)=', response);
      })
      .catch((err) => console.log(err));
  };

  const handleClickGetUserTheme = () => {
    getUserTheme();
  };

  const handleClickCreateUserTheme = () => {
    createUserTheme();
  };

  const getUser = async (requestedData?: FindRequest) => {
    const queryStr = `/?${queryString.stringify({
      id: 100500,
    })}`;
    themesApi
      .getUser(queryStr)
      .then((response) => {
        console.log('response(getUser)=', response);
      })
      .catch((err) => console.log(err));
  };

  const createUser = async (requestedData?: CreateUserRequest) => {
    const bodyToSend = {
      id: 100501,
    };
    themesApi
      .createUser(bodyToSend)
      .then((response) => {
        console.log('response(createUser)=', response);
      })
      .catch((err) => console.log(err));
  };

  const handleClickGetUser = () => {
    getUser();
  };

  const handleClickCreateUser = () => {
    createUser();
  };

  const handleClickChangeTheme = () => {
    // @ts-ignore
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={s.container}>
      <div className={s.buttons}>
        <Button
          text='Create Some Theme'
          type='button'
          styleType='contained'
          size='dense'
          onClick={handleClickCreateSomeTheme}
        />
      </div>

      <div className={s.buttons}>
        <Button
          text='Get Some Theme'
          type='button'
          styleType='contained'
          size='dense'
          onClick={handleClickGetSomeTheme}
        />
      </div>
      <div className={s.buttons}>
        <Button
          text='Create User Theme'
          type='button'
          styleType='contained'
          size='dense'
          onClick={handleClickCreateUserTheme}
        />
      </div>
      <div className={s.buttons}>
        <Button
          text='Change Theme'
          type='button'
          styleType='contained'
          size='dense'
          onClick={handleClickChangeTheme}
        />
      </div>
    </div>
  );
};

export const TestThemes = connector(TestThemes1);
