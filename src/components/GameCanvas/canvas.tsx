import React, {FC} from 'react';
import styles from './canvas.module.scss';
import { gameEngine } from '@/services/game-engine'

interface IBroadcastPayload {
  prevX: string,
  prevY: string,
  currX: string,
  currY: string,
  force?: string,
  color: string
}

type OwnProps = {
  incomingImageData: IBroadcastPayload,
  onBroadcast: (data: string) => void
};

type Props = FC<OwnProps>;

export const GameCanvas: Props = ({ onBroadcast, incomingImageData })  => {
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    gameEngine.drawIncomingImage(incomingImageData)
  }, [incomingImageData])

  React.useEffect(() => {

    const canvas = canvasRef.current

    if (canvas) {
      gameEngine.init(canvas, onBroadcast)
    }
  }, [canvasRef])

  return (
    <div className={styles.canvasScreen}>
      <canvas ref={canvasRef} height="480px" width="610px" className={styles.canvas}></canvas>
    </div>
  )
}
