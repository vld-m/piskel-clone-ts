import './canvas.css';

// entities
import ActiveTool from '../toolList/tool/activeTool';
import Grid from './grid';

class Canvas {
  public readonly container = document.createElement('div');

  private canvas = document.createElement('canvas');

  private context = this.canvas.getContext('2d', { desynchronized: true });

  private grid: Grid | null = null;

  private tool = new ActiveTool();

  constructor() {
    this.setContainerAttributes();
    this.addListenersToWindow();
    this.addListenersToCanvas();
    this.renderCanvas();
  }

  private addListenersToCanvas(): void {
    this.canvas.addEventListener('contextmenu', this.onContextMenu);
  }

  private onContextMenu = (event: Event): void => {
    event.preventDefault();
  };

  private addListenersToWindow(): void {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('DOMContentLoaded', (event: Event) => {
      this.onResize(event);

      this.grid = new Grid(this.canvas);
    });
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
