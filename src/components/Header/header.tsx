import React, { FC, useState } from 'react';
import { HeaderProps } from './';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import s from './header.module.scss';
import { Modal } from '@components/Modal';
import { IModalState } from './types';
import { Profile } from '../Profile';

type Props = HeaderProps;

export const Header: FC<Props> = () => {
  const [modalState, setModalState] = useState<IModalState>({
    isModalOpen: false,
  });

  const showModal = () => {
    setModalState((modalState) => ({
      ...modalState,
      isModalOpen: !modalState.isModalOpen,
    }));
  };

  const closeModal = () => {
    setModalState((modalState) => ({ ...modalState, isModalOpen: false }));
  };

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
        <div className={s.rightSide}>
          <Button
            text='Профиль'
            styleType='contained'
            size='dense'
            styleObj={s.btnContainer}
            onClick={() => showModal()}
          />
          <Button
            text='Выйти'
            styleType='contained'
            size='dense'
            styleObj={s.btnContainer}
          />
        </div>
      </div>
      <Modal onClose={closeModal} isModalOpen={modalState.isModalOpen}>
        <Profile />
      </Modal>
    </div>
  );
};
