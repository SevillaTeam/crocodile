import React, {FC} from 'react';
import styles from './canvas.module.scss';
import { gameEngine } from '../../services/game-engine'

type OwnProps = {
  active: boolean
};

type Props = FC<OwnProps>;

const clearCanvas = () => {
  gameEngine.clearCanvas()
}

export const GameCanvas: Props = ({ active })  => {
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    if (!active) {
      gameEngine.destroy()
      return
    }

    const canvas = canvasRef.current
  
    if (canvas) {
      gameEngine.init(canvas)
    }
  }, [canvasRef, active])

  return (
    <div className={styles.canvasScreen}>
      <canvas ref={canvasRef} width="600px" height="450px" className={styles.canvas}></canvas>
      <button className={styles.clear} onClick={clearCanvas}>Очистить канвас</button>
    </div>
  )
}