import React from 'react';
import { GameCanvas } from '../../components/GameCanvas';
import { GameChat } from '../../components/GameChat';
import styles from './game.module.scss';

const PLAYER_STATUSES = {
  'drawer': 0,
  'guesser': 1
}
const initPlayerStatus = PLAYER_STATUSES.drawer

export const Game = (): JSX.Element => {
  const [playerStatus, setPlayerStatus] = React.useState(initPlayerStatus)
  const changePlayerStatus = () => {
    const status = playerStatus === PLAYER_STATUSES.drawer ? PLAYER_STATUSES.guesser : PLAYER_STATUSES.drawer
    setPlayerStatus(status)
  }

  return (
    <main className={styles.gameTest}>
      <div className={styles.game} >
        <GameCanvas active={playerStatus === PLAYER_STATUSES.drawer} />
        <GameChat active={playerStatus === PLAYER_STATUSES.guesser} />
      </div>
      <button onClick={changePlayerStatus}>{ playerStatus === PLAYER_STATUSES.drawer ? 'Хочу угадывать' : 'Хочу рисовать' }</button>
    </main>
  );
};
