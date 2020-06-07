import './canvas.css';

// interfaces
import { CanvasListeners, Cell } from '../interfaces';

class Canvas {
  private canvas = document.createElement('canvas');

  private container = document.createElement('div');

  private context = this.canvas.getContext('2d', { desynchronized: true });

  constructor() {
    this.setContainerAttributes()
      .addCanvasListeners()
      .renderCanvas();
  }

  public getCanvasBasedCoordinates({ clientX, clientY }: MouseEvent): { x: number; y: number } {
    return {
      x: clientX - this.canvas.offsetLeft,
      y: clientY - this.canvas.offsetTop,
    };
  }

  public getContainer(): HTMLDivElement {
    return this.container;
  }

  public getContext(): CanvasRenderingContext2D | null {
    return this.context;
  }

  public getHeight(): number {
    return this.canvas.height;
  }

  public paint({ color, topLeftX, topLeftY }: Cell, size: number): void {
    if (this.context === null) {
      return;
    }

    this.context.fillStyle = color;
    this.context.fillRect(topLeftX, topLeftY, size, size);
  }

  public resize(size: number): void {
    this.canvas.width = size;
    this.canvas.height = size;
  }

  public subscribe({ onMouseDown }: CanvasListeners): void {
    this.canvas.addEventListener('mousedown', onMouseDown);
  }

  private addCanvasListeners(): Canvas {
    this.canvas.addEventListener('contextmenu', this.onContextMenu);

    return this;
  }

  private onContextMenu: EventListener = (event: Event): void => {
    event.preventDefault();
  };

  private renderCanvas(): Canvas {
    this.canvas.classList.add('canvas');

    this.container.append(this.canvas);

    return this;
  }

  private setContainerAttributes(): Canvas {
    this.container.classList.add('container', 'container_canvas');

    return this;
  }
}

export default Canvas;
