import React, {FC} from 'react';
import styles from './canvas.module.scss';
import { gameEngine } from '../../services/game-engine'

interface IBroadcastPayload {
  prevX: string,
  prevY: string,
  currX: string,
  currY: string,
  force?: string,
  color: string
}


type OwnProps = {
  active: boolean,
  imageData: IBroadcastPayload,
  onBroadcast: (data: string) => void
};

type Props = FC<OwnProps>;

const clearCanvas = () => {
  gameEngine.clearCanvas()
}

export const GameCanvas: Props = ({ active, onBroadcast, imageData })  => {
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    gameEngine.drawBroadcast(imageData)
  }, [imageData])

  React.useEffect(() => {
    if (!active) {
      gameEngine.destroy()
      return
    }

    const canvas = canvasRef.current


    if (canvas) {
      gameEngine.init(canvas, onBroadcast)
    }
  }, [canvasRef, active])

  return (
    <div className={styles.canvasScreen}>
      <canvas ref={canvasRef} width="600px" height="450px" className={styles.canvas}></canvas>
      <button className={styles.clear} onClick={clearCanvas}>Очистить канвас</button>
    </div>
  )
}
