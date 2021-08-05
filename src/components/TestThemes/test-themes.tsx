import React, { FC } from 'react';
import {
  CreateRequestUserTheme,
  FindRequest,
  CreateUserRequest,
} from '../../server-ssr/controllers/interface';
import { Button } from '../Button';
import s from './test-themes.module.scss';
import * as api from '../../server-ssr/themes-api/';
const queryString = require('query-string');

export const TestThemes: FC = (props) => {
  const getTheme = async (requestedData?: FindRequest) => {
    const queryStr = `/?${queryString.stringify({
      id: 5,
      title: 'Темка 3',
    })}`;

    try {
      api
        .getSiteTheme(queryStr)
        .then((response) => {
          if (response.status >= 400)
            throw new Error('Ошибка сервера при запросе темы');
          return response.json();
        })
        .then((result) => {
          console.log(result);
          return result;
        })
        .catch((err) => {
          if (err.message.includes('Unexpected end of JSON input'))
            console.log('Тема не найдена!');
          else console.log(err);
          return null;
        });
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const createTheme = async (requestedData?: FindRequest) => {
    const bodyToSend = {
      theme: 'Темка 5',
      description: 'Юзать всегда5',
    };

    try {
      api
        .createSiteTheme(bodyToSend)
        .then((response) => {
          if (response.status >= 400)
            throw new Error('Ошибка сервера при создании темы');
          return response.json();
        })
        .then((result) => {
          console.log(result);
          return result;
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Ошибка:', error);
    }
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

    try {
      api
        .getUserTheme(queryStr)
        .then((response) => {
          if (response.status >= 400)
            throw new Error('Ошибка сервера при запросе темы');
          return response.json();
        })
        .then((result) => {
          console.log(result);
          return result;
        })
        .catch((err) => {
          if (err.message.includes('Unexpected end of JSON input'))
            console.log('Тема не найдена!');
          else console.log(err);
          return null;
        });
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const createUserTheme = async (requestedData?: CreateRequestUserTheme) => {
    const bodyToSend = {
      themeId: 3,
      theme: 'Темка 6',
      ownerId: 100500,
    };

    try {
      api
        .createUserTheme(bodyToSend)
        .then((response) => {
          if (response.status >= 400)
            throw new Error('Ошибка сервера при создании темы');
          return response.json();
        })
        .then((result) => {
          console.log(result);
          return result;
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Ошибка:', error);
    }
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

    try {
      api
        .getUser(queryStr)
        .then((response) => {
          if (response.status >= 400)
            throw new Error('Ошибка сервера при запросе инфо пользователя');
          return response.json();
        })
        .then((result) => {
          console.log(result);
          return result;
        })
        .catch((err) => {
          if (err.message.includes('Unexpected end of JSON input'))
            console.log('Пользователь не найден!');
          else console.log(err);
          return null;
        });
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const createUser = async (requestedData?: CreateUserRequest) => {
    const bodyToSend = {
      id: 100501,
    };

    try {
      api
        .createUser(bodyToSend)
        .then((response) => {
          if (response.status >= 400)
            throw new Error('Ошибка сервера при создании пользователя');
          return response.json();
        })
        .then((result) => {
          console.log(result);
          return result;
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleClickGetUser = () => {
    getUser();
  };

  const handleClickCreateUser = () => {
    createUser();
  };

  return (
    <div className={s.container}>
      <p className={s.text}>
        userId from Redux store: <span>123</span>
      </p>
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
          text='Get User Theme'
          type='button'
          styleType='contained'
          size='dense'
          onClick={handleClickGetUserTheme}
        />
      </div>
      <div className={s.buttons}>
        <Button
          text='Create User'
          type='button'
          styleType='contained'
          size='dense'
          onClick={handleClickCreateUser}
        />
      </div>
      <div className={s.buttons}>
        <Button
          text='Get User'
          type='button'
          styleType='contained'
          size='dense'
          onClick={handleClickGetUser}
        />
      </div>
    </div>
  );
};
