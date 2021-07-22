import React, { FC } from 'react';
import styles from './canvas.module.scss';
import { gameEngine } from '@/services/game-engine';
import { IUserGameRoleState, IBroadcastPayload } from './interfaces';
import { connector } from './container';
import { PLAYER_ROLE } from '../../services/game-engine/constants';

type OwnProps = {
  incomingImageData: IBroadcastPayload;
  onBroadcast: (data: string) => void;
  gameRole?: IUserGameRoleState;
};

type Props = FC<OwnProps>;

const GameCanvas: Props = ({ onBroadcast, incomingImageData, gameRole }) => {
  const canvasRef = React.useRef(null);

  const disableCanvas = () => {
    if (gameRole === PLAYER_ROLE.artist) {
      console.log('gameRole = ARTIST, слушатели canvas включены');
      return false;
    }
    console.log('gameRole = GUESSER || undefined, слушатели canvas ОТКЛЮЧЕНЫ');
    return true;
  };

  React.useEffect(() => {
    gameEngine.drawIncomingImage(incomingImageData);
  }, [incomingImageData]);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      gameEngine.init(canvas, onBroadcast, disableCanvas());
    }
  }, [canvasRef]);

  return (
    <div className={styles.canvasScreen}>
      <canvas
        ref={canvasRef}
        height='480px'
        width='610px'
        className={styles.canvas}
      ></canvas>
    </div>
  );
};

export default connector(GameCanvas);
