import './canvas.css';

// interfaces
import { Cell } from '../interfaces';

class Canvas {
  public canvas = document.createElement('canvas');

  public context = this.canvas.getContext('2d', { desynchronized: true });

  constructor() {
    this.addCanvasListeners();
  }

  public fill({ color, topLeftX, topLeftY }: Cell, sideLength: number): void {
    if (this.context === null) {
      return;
    }

    this.context.fillStyle = color;
    this.context.fillRect(topLeftX, topLeftY, sideLength, sideLength);
  }

  public resize(sideLength: number): void {
    this.canvas.width = sideLength;
    this.canvas.height = sideLength;
  }

  private addCanvasListeners(): void {
    this.canvas.addEventListener('contextmenu', this.onContextMenu);
  }

  private onContextMenu: EventListener = (event: Event): void => {
    event.preventDefault();
  };
}

export default Canvas;
