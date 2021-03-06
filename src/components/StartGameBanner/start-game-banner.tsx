import React, { FC, useCallback, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@components/Button';
import s from './start-game-banner.module.scss';
import { Modal } from '@components/Modal';
import { Modal as ModalWordSelector } from '@components/Modal';
import { WordSelector } from '@components/WordSelector';
import { PLAYER_ROLE } from '../../services/game-engine/constants';
import { changeUserGameRole } from '@components/Profile/redux-sagas/actions';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '@/context';
import cn from 'classnames';

export const StartGameBanner: FC = () => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWordSelector, setIsOpenWordSelector] = useState(false);
  const history = useHistory();

  const toggleModalWordSelector = useCallback(() => {
    setIsOpenWordSelector(!isOpenWordSelector);
  }, [isOpenWordSelector]);

  const toggleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const setRole = useCallback((role: string) => {
    dispatch(changeUserGameRole({ gameRole: role }));
    setIsOpen(false);
    if (role === PLAYER_ROLE.artist) {
      toggleModalWordSelector();
    } else {
      goToGame();
    }
  }, []);

  const goToGame = () => {
    history.push('/game');
  };

  return (
    <div>
      <div className={cn(s.banner, s[theme])}>
        <span className={s.header}>Онлайн игра</span>
        <span className={s.text}>
          Один рисует, остальные отгадывают в режиме реального времени.
        </span>
        <Button
          className={s.btn}
          styleType='contained'
          text={'Играть'}
          onClick={toggleModal}
        />
      </div>
      <Modal isModalOpen={isOpen} onClose={toggleModal}>
        <div className={cn(s.modalContainer, s[theme])}>
          <span className={s.header}>В какой роли хотите играть?</span>
          <div className={s.buttonsContainer}>
            <Button
              className={s.btn}
              styleType='contained'
              text={'Рисовать'}
              onClick={() => {
                setRole(PLAYER_ROLE.artist);
              }}
            />
            <Button
              className={s.btn}
              styleType='contained'
              text={'Отгадывать'}
              onClick={() => {
                setRole(PLAYER_ROLE.guesser);
              }}
            />
          </div>
        </div>
      </Modal>
      <ModalWordSelector
        isModalOpen={isOpenWordSelector}
        onClose={toggleModalWordSelector}
      >
        <WordSelector onClose={goToGame} />
      </ModalWordSelector>
    </div>
  );
};
