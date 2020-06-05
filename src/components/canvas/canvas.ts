import './canvas.css';

// interfaces
import { CanvasListeners } from '../interfaces';

class Canvas {
  private canvas = document.createElement('canvas');

  private container = document.createElement('div');

  private context = this.canvas.getContext('2d', { desynchronized: true });

  constructor() {
    this.setContainerAttributes();
    this.renderCanvas();
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

  public resize(size: number): void {
    this.canvas.width = size;
    this.canvas.height = size;
  }

  public subscribe({ onContextMenu, onMouseDown }: CanvasListeners): void {
    this.canvas.addEventListener('contextmenu', onContextMenu);
    this.canvas.addEventListener('mousedown', onMouseDown);
  }

  private renderCanvas(): void {
    this.canvas.classList.add('canvas');

    if (this.context) {
      this.context.imageSmoothingEnabled = false;
    }

    this.container.append(this.canvas);
  }

  private setContainerAttributes(): void {
    this.container.classList.add('container', 'container_canvas');
  }
}

export default Canvas;
