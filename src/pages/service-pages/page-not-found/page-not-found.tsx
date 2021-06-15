import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './page-not-found.module.scss';

export const PageNotFound = (): JSX.Element => {
  const location = useLocation();
  return (
    <div className={s.pageNotFound}>
      <h1 className={s.pageNotFound__title}>404</h1>
      <p className={s.pageNotFound__description}>Здесь ничего нет...</p>
      <p className={s.pageNotFound__description}>
        path: <strong>{location.pathname}</strong>{' '}
      </p>
      <Link className={s.pageNotFound__link} to='/'>
        Перейти на главную страницу
      </Link>
    </div>
  );
};
