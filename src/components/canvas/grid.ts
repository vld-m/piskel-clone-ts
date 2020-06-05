// entities
import ActiveTool from '../toolList/tool/activeTool';
import Canvas from './canvas';

// interfaces
import { CanvasListeners, Cell } from '../interfaces';

const CELLS_ON_SIDE = 12;

class Grid {
  public readonly container: HTMLDivElement;

  private activeTool = new ActiveTool();

  private canvas = new Canvas();

  private cellSize = this.canvas.getHeight() / CELLS_ON_SIDE;

  private grid: Cell[] = [];

  constructor() {
    this.container = this.canvas.getContainer();

    this.addListenersToCanvas();
    this.addListenersToWindow();
    this.createGrid();
  }

  private addListenersToCanvas(): void {
    this.canvas.subscribe(this.getCanvasListeners());
  }

  private addListenersToWindow(): void {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('DOMContentLoaded', this.onResize);
  }

  private createGrid(): void {
    for (let row = 0; row < CELLS_ON_SIDE; row += 1) {
      for (let column = 0; column < CELLS_ON_SIDE; column += 1) {
        const cell: Cell = {
          topLeftX: column * this.cellSize,
          topLeftY: row * this.cellSize,
          color: 'transparent',
        };

        this.grid = [...this.grid, cell];
      }
    }
  }

  private getCanvasListeners(): CanvasListeners {
    return {
      onContextMenu: this.onContextMenu,
      onMouseDown: this.onMouseDown,
    };
  }

  private getCell(event: MouseEvent): Cell | undefined {
    const { x, y } = this.canvas.getCanvasBasedCoordinates(event);

    return this.grid.find(
      ({ topLeftX, topLeftY }) => x < topLeftX + this.cellSize && y < topLeftY + this.cellSize
    );
  }

  private onContextMenu = (event: Event): void => {
    event.preventDefault();
  };

  private onMouseDown: EventListener = (event: Event): void => {
    if (event instanceof MouseEvent) {
      const context = this.canvas.getContext();
      const cell = this.getCell(event);

      if (context !== null && cell !== undefined) {
        this.activeTool.treat(context, cell);
      }
    }
  };

  private onResize = (): void => {
    const size = this.container.clientHeight;

    this.resize(size);
    this.canvas.resize(size);
  };

  private resize(size: number): void {
    const ratio = size / (this.cellSize * CELLS_ON_SIDE);

    this.grid = this.grid.map(({ topLeftX, topLeftY, color }) => ({
      topLeftX: topLeftX * ratio,
      topLeftY: topLeftY * ratio,
      color,
    }));

    this.cellSize = size / CELLS_ON_SIDE;
  }
}

export default Grid;
