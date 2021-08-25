import React, { FC, useState, useCallback, useContext } from 'react';
import { HeaderProps } from './';
import { connector } from './container';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import s from './header.module.scss';
import { Modal } from '@components/Modal';
import { Modal as ModalLogout } from '@components/Modal';
import { Modal as ModalOAuth } from '@components/Modal';
import { IModalState } from './types';
import { Profile } from '../Profile';
import { Logout } from '../Logout';
import { OAuth } from '../OAuth';
import { ThemeContext } from '@/context';

type Props = HeaderProps;

const HeaderComponent: FC<Props> = (props) => {
  const { userData } = props;
  const { theme } = useContext(ThemeContext);

  const [modalProfileState, setModalProfileState] = useState<IModalState>({
    isModalOpen: false,
  });

  const [modalLogoutState, setModalLogoutState] = useState<IModalState>({
    isModalOpen: false,
  });

  const [modalOAuthState, setModalOAuthState] = useState<IModalState>({
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

  const showModalOAuth = useCallback(() => {
    setModalOAuthState((modalOAuthState) => ({
      ...modalOAuthState,
      isModalOpen: !modalOAuthState.isModalOpen,
    }));
  }, [modalOAuthState]);

  const closeModalOAuth = useCallback(() => {
    setModalOAuthState((modalOAuthState) => ({
      ...modalOAuthState,
      isModalOpen: false,
    }));
  }, [modalOAuthState]);

  return (
    <div className={cn(s.header, s[theme])}>
      <div className={s.container}>
        <ul className={s.leftSide}>
          <li className={cn(s.nav__link, s.nav__link_btnType)}>
            <Link to='/' className={s.nav__linkText}>
              Главная
            </Link>
          </li>
          <li className={cn(s.nav__link, s.nav__link_btnType)}>
            <Link to='/rating' className={s.nav__linkText}>
              Рейтинг
            </Link>
          </li>
        </ul>
        <div className={s.rightSide}>
          {userData?.isLoggedIn ? (
            <>
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
                onClick={showModalLogout}
              />
            </>
          ) : (
            <>
              <ul className={cn(s.nav__link_mr_2)}>
                <li className={cn(s.nav__link, s.nav__link_btnType)}>
                  <Link to='/oauth' className={s.nav__linkText}>
                    Войти
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
      <Modal
        onClose={closeModalProfile}
        isModalOpen={modalProfileState.isModalOpen}
      >
        <Profile onClose={closeModalProfile} />
      </Modal>
      <ModalLogout
        onClose={closeModalLogout}
        isModalOpen={modalLogoutState.isModalOpen}
      >
        <Logout onClose={closeModalLogout} />
      </ModalLogout>
      <ModalOAuth
        onClose={closeModalOAuth}
        isModalOpen={modalOAuthState.isModalOpen}
      >
        <OAuth onClose={closeModalOAuth} />
      </ModalOAuth>
    </div>
  );
};

export const Header = connector(HeaderComponent);
