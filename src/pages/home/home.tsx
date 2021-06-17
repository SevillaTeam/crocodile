import React from 'react';
import { Link } from 'react-router-dom';
import s from './home.module.scss';

export const Home = (): JSX.Element => {
  return (
    <div className={s.homePage}>
      <h1 className={s.homePage__title}>Home page Croco</h1>
      <p className={s.homePage__description}>Здесь все будет... скоро</p>
      <Link className={s.homePage__link} to='/page-not-found'>
        Перейти на 404 страницу
      </Link>
      <Link className={s.homePage__link} to='/game'>
        Go to game page
      </Link>
    </div>
  );
};
