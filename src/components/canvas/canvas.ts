import './canvas.css';

// interfaces
import { CanvasListeners, Cell } from '../interfaces';

class Canvas {
  private canvas = document.createElement('canvas');

  private container = document.createElement('div');

  private context = this.canvas.getContext('2d', { desynchronized: true });

  constructor() {
    this.setContainerAttributes();
    this.addCanvasListeners();
    this.renderCanvas();
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public getContainer(): HTMLDivElement {
    return this.container;
  }

  public getContext(): CanvasRenderingContext2D | null {
    return this.context;
  }

  public getOffsetProperties(): { offsetTop: number; offsetLeft: number } {
    return {
      offsetTop: this.canvas.offsetTop,
      offsetLeft: this.canvas.offsetLeft,
    };
  }

  public getSize(): number {
    return Math.min(this.container.clientWidth, this.container.clientHeight);
  }

  public highlight(): void {
    this.canvas.classList.add('canvas_active');

    setTimeout(() => {
      this.canvas.classList.remove('canvas_active');
    }, 250);
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

  public subscribe({ onMouseDown, onMouseLeave, onMouseMove, onMouseUp }: CanvasListeners): void {
    this.canvas.addEventListener('mousedown', onMouseDown);
    this.canvas.addEventListener('mouseleave', onMouseLeave);
    this.canvas.addEventListener('mousemove', onMouseMove);
    this.canvas.addEventListener('mouseup', onMouseUp);
  }

  private addCanvasListeners(): void {
    this.canvas.addEventListener('contextmenu', this.onContextMenu);
  }

  private onContextMenu: EventListener = (event: Event): void => {
    event.preventDefault();
  };

  private renderCanvas(): void {
    this.canvas.classList.add('canvas');

    this.container.append(this.canvas);
  }

  private setContainerAttributes(): void {
    this.container.classList.add('container', 'container_canvas');
  }
}

export default Canvas;
