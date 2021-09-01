import React, { FC, useEffect } from 'react';
import styles from './canvas.module.scss';
import { gameEngine } from '@/services/game-engine';
import { IBroadcastPayload } from './interfaces';
import { connector } from './container';
import { disableCanvas } from '../../utlis/disable-canvas';

type OwnProps = {
  incomingImageData: IBroadcastPayload;
  onBroadcast: (data: string) => void;
  gameRole: string;
};

type Props = FC<OwnProps>;

const GameCanvas: Props = ({ onBroadcast, incomingImageData, gameRole }) => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    gameEngine.drawIncomingImage(incomingImageData);
  }, [incomingImageData]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      gameEngine.init(canvas, onBroadcast, disableCanvas(gameRole));
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
