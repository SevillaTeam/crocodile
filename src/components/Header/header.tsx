import React, { FC } from 'react';
import { HeaderProps } from './';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import s from './header.module.scss';

type Props = HeaderProps;

export const Header: FC<Props> = (props) => {
  const {} = props;

  return (
    <div className={s.header}>
      <div className={s.container}>
        <ul className={s.leftSide}>
          <li className={cn(s.nav__link, s.nav__link_btnType)}>
            <Link to='/' className={s.nav__linkText}>
              Главная
            </Link>
          </li>
          <li className={cn(s.nav__link, s.nav__link_btnType)}>
            <Link to='/game' className={s.nav__linkText}>
              Игра
            </Link>
          </li>
          <li className={cn(s.nav__link, s.nav__link_btnType)}>
            <Link to='/rating' className={s.nav__linkText}>
              Рейтинг
            </Link>
          </li>
        </ul>
        <div className={s.rigthSide}>
          <ul className={cn(s.leftSide, s.leftSide)}>
            <li className={cn(s.nav__link, s.nav__link_btnType)}>
              <Link to='/' className={s.nav__linkText}>
                Выйти
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
