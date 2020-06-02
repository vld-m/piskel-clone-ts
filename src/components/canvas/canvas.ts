import './canvas.css';

class Canvas {
  public readonly container = document.createElement('div');

  private canvas = document.createElement('canvas');

  private context = this.canvas.getContext('2d', { desynchronized: true });

  constructor() {
    this.setContainerAttributes();
    this.addListenersToWindow();
    this.addListenersToCanvas();
    this.renderCanvas();
  }

  private addListenersToCanvas(): void {
    this.canvas.addEventListener('contextmenu', (event: Event): void => {
      event.preventDefault();
    });
  }

  private addListenersToWindow(): void {
    window.addEventListener('DOMContentLoaded', this.onResize);
    window.addEventListener('resize', this.onResize);
  }

  private onResize: EventListener = (): void => {
    const side = this.container.clientHeight;

    this.canvas.width = side;
    this.canvas.height = side;
  };

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

export default new Canvas();
