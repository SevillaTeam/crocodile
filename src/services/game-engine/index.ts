type Res = 'move' | 'down' | 'up' | 'out';

interface IBroadcastPayload {
  prevX: string;
  prevY: string;
  currX: string;
  currY: string;
  thickness?: string;
  color: string;
}

class GameEngine {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;

  private flag = false;
  private prevX = 0;
  private currX = 0;
  private prevY = 0;
  private currY = 0;
  private dotFlag = false;
  private onBroadcast = (data: string) => {
    //adf
  };

  private color = 'black';
  private thickness = 5;

  public init(canvas: HTMLCanvasElement, onBroadcast: (data: string) => void) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onBroadcast = onBroadcast;

    this.addCanvasListeners();
  }

  public destroy() {
    this.removeCanvasListeners();
  }

  public clearCanvas() {
    if (!this.ctx) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private onMouseMove = (e: MouseEvent) => {
    this.findXY('move', e);
  };

  private onMouseDown = (e: MouseEvent) => {
    this.findXY('down', e);
  };

  private onMouseUp = (e: MouseEvent) => {
    this.findXY('up', e);
  };

  private onMouseOut = (e: MouseEvent) => {
    this.findXY('out', e);
  };

  private addCanvasListeners() {
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('mouseout', this.onMouseOut);
  }

  private removeCanvasListeners() {
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mouseup', this.onMouseUp);
    this.canvas.removeEventListener('mouseout', this.onMouseOut);
  }

  drawIncomingImage(broadcastPayload: IBroadcastPayload) {
    if (!this.ctx) {
      return;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(
      Number(broadcastPayload.prevX),
      Number(broadcastPayload.prevY),
    );
    this.ctx.lineTo(
      Number(broadcastPayload.currX),
      Number(broadcastPayload.currY),
    );
    this.ctx.strokeStyle = broadcastPayload.color;
    this.ctx.lineWidth = this.thickness;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private draw() {
    if (!this.ctx) {
      return;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.currX, this.currY);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.thickness;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private findXY(res: Res, e: MouseEvent) {
    if (res == 'down') {
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.currX = e.clientX - this.canvas.getBoundingClientRect().left;
      this.currY = e.clientY - this.canvas.getBoundingClientRect().top;

      this.flag = true;
      this.dotFlag = true;
      if (this.dotFlag && this.ctx) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.currX, this.currY, 2, 2);
        this.ctx.closePath();
        this.dotFlag = false;
      }
    }
    if (res == 'up' || res == 'out') {
      this.flag = false;
    }
    if (res == 'move') {
      if (this.flag) {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvas.getBoundingClientRect().left;
        this.currY = e.clientY - this.canvas.getBoundingClientRect().top;
        this.draw();
        this.onBroadcast(
          JSON.stringify({
            prevX: this.prevX,
            prevY: this.prevY,
            currX: this.currX,
            currY: this.currY,
            color: this.color,
          }),
        );
      }
    }
  }
}

export const gameEngine = new GameEngine();
