import React, { FormEvent, FC, useState, useCallback, useContext } from 'react';
import { Input, IInputState } from '../Input';
import { Button } from '../Button';
import s from './chng-theme-form.module.scss';
import { changePasswordRequest } from '../../services';
import { ChngThemeFormProps } from './interfaces';
import { validateField, validateForm } from '../../utlis/form-validator';
import { ThemeContext } from '@/context';
import * as themesApi from '../../server-ssr/themes-api';
const queryString = require('query-string');
import {
  CreateRequestUserTheme,
  FindRequest,
  CreateUserRequest,
  DeleteRequest,
} from '../../server-ssr/controllers/interface';
import { connector } from './container';

export const ChngThemeFormComp: FC<ChngThemeFormProps> = (props) => {
  const { userData, onClose } = props;

  const { theme, setTheme } = useContext(ThemeContext);
  const [themeState, setThemeState] = useState({ theme });

  const getThemeByOwnerId = async (requestedData: FindRequest) => {
    const queryStr = `/?${queryString.stringify({
      ownerId: requestedData?.ownerId,
    })}`;

    return themesApi
      .getSiteThemeByOwnerId(queryStr)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  };

  const getThemeByTitle = async (requestedData: FindRequest) => {
    const queryStr = `/?${queryString.stringify({
      title: requestedData?.title,
    })}`;

    return themesApi
      .getSiteThemeByIdorTitle(queryStr)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  const onChangeRadio = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    setThemeState(
      themeState.theme === 'dark' ? { theme: 'light' } : { theme: 'dark' },
    );
    if (target.id === 'id-theme-light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const createUserTheme = async (requestedData?: CreateRequestUserTheme) => {
    const { id } = userData;
    const bodyToSend = {
      themeId: requestedData?.themeId,
      theme: requestedData?.theme,
      ownerId: id,
    };
    return themesApi
      .createUserTheme(bodyToSend)

      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => Promise.reject(err));
  };

  const deleteUserThemes = async (requestedData: DeleteRequest) => {
    const bodyToSend = {
      ownerId: requestedData.ownerId,
    };
    return themesApi
      .deleteUserTheme(bodyToSend)

      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => Promise.reject(err));
  };

  const onSaveBtn = useCallback(() => {
    const { id } = userData;
    deleteUserThemes({ ownerId: id })
      .then((res) => {
        // Результат - количество удаленных записей
        // Теперь создадим тему пользователя
        const { theme } = themeState;
        const { id } = userData;
        getThemeByTitle({ title: theme })
          .then((res) => {
            if (res.id) {
              createUserTheme({ themeId: res.id as number, theme, ownerId: id })
                .then(() => onClose())
                .catch((err) => console.log('err(createUserTheme)=', err));
            }
          })
          .catch((err) => console.log('err(createUserTheme)=', err));
      })
      .catch((err) => console.log('err(getThemeByTitle)=', err));
  }, [userData]);

  const onCancelBtn = useCallback(() => {
    const { id } = userData;
    getThemeByOwnerId({ ownerId: id })
      .then((res) => {
        if (res.length) {
          // @ts-ignore
          const { theme } = res[0];
          if (theme) setTheme(theme);
        }
        onClose();
      })
      .catch((err) => console.log('err(getThemeByOwnerId)=', err));
  }, [userData]);

  return (
    <div className={s.container}>
      <form className={s.form}>
        <h1 className={s.title}>Выбрать тему оформления</h1>
        <div className={s.inputs}>
          <input
            className={s.input}
            id='id-theme-light'
            type='radio'
            name='contact'
            value='theme-light'
            checked={themeState.theme === 'light'}
            onChange={onChangeRadio}
          />
          <label className={s.label} htmlFor='id-theme-light'>
            Light
          </label>
          <div className={s.separator} />
          <input
            className={s.input}
            id='id-theme-dark'
            type='radio'
            name='contact'
            value='theme-dark'
            checked={themeState.theme === 'dark'}
            onChange={onChangeRadio}
          />
          <label className={s.label} htmlFor='id-theme-dark'>
            Dark
          </label>
        </div>
        <div className={s.buttons}>
          <Button
            type='button'
            styleType='contained'
            size='dense'
            disabled={false}
            text='Отмена'
            styleObj={s.button}
            onClick={onCancelBtn}
          />
          <Button
            type='button'
            styleType='contained'
            size='dense'
            disabled={false}
            text='Сохранить'
            styleObj={s.button}
            onClick={onSaveBtn}
          />
        </div>
      </form>
    </div>
  );
};

export const ChngThemeForm = connector(ChngThemeFormComp);
