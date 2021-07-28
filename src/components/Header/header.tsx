import React, { FC, useState, useCallback } from 'react';
import { HeaderProps } from './';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import s from './header.module.scss';
import { Modal } from '@components/Modal';
import { Modal as ModalLogout } from '@components/Modal';
import { IModalState } from './types';
import { Profile } from '../Profile';
import { Logout } from '../Logout';

type Props = HeaderProps;

export const Header: FC<Props> = () => {
  const [modalProfileState, setModalProfileState] = useState<IModalState>({
    isModalOpen: false,
  });

  const [modalLogoutState, setModalLogoutState] = useState<IModalState>({
    isModalOpen: false,
  });

  const showModalProfile = useCallback(() => {
    setModalProfileState((modalProfileState) => ({
      ...modalProfileState,
      isModalOpen: !modalProfileState.isModalOpen,
    }));
  }, [modalProfileState]);

  const closeModalProfile = useCallback(() => {
    setModalProfileState((modalProfileState) => ({
      ...modalProfileState,
      isModalOpen: false,
    }));
  }, [modalProfileState]);

  const showModalLogout = useCallback(() => {
    setModalLogoutState((modalLogoutState) => ({
      ...modalLogoutState,
      isModalOpen: !modalLogoutState.isModalOpen,
    }));
  }, [modalLogoutState]);

  const closeModalLogout = useCallback(() => {
    setModalLogoutState((modalLogoutState) => ({
      ...modalLogoutState,
      isModalOpen: false,
    }));
  }, [modalLogoutState]);

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
            onClick={() => showModalProfile()}
          />
          <Button
            text='Выйти'
            styleType='contained'
            size='dense'
            styleObj={s.btnContainer}
            onClick={() => showModalLogout()}
          />
        </div>
      </div>
      <Modal
        onClose={closeModalProfile}
        isModalOpen={modalProfileState.isModalOpen}
      >
        <Profile />
      </Modal>
      <ModalLogout
        onClose={closeModalLogout}
        isModalOpen={modalLogoutState.isModalOpen}
      >
        <Logout onClose={closeModalLogout} />
      </ModalLogout>
    </div>
  );
};
