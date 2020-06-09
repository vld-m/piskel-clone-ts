// entities
import ActiveTool from '../toolList/tool/activeTool';
import Canvas from './canvas';

// interfaces
import { CanvasListeners, Cell, Coordinates, MouseActionCoordinates } from '../interfaces';

const CELLS_ON_SIDE = 12;

class Grid {
  public readonly container: HTMLDivElement;

  private activeTool = new ActiveTool();

  private canvas = new Canvas();

  private cellSize = this.canvas.getHeight() / CELLS_ON_SIDE;

  private grid: Cell[] = [];

  private isMouseDown = false;

  private latestCoordinates: Coordinates = { x: 0, y: 0 };

  constructor() {
    this.container = this.canvas.getContainer();

    this.addCanvasListeners()
      .addWindowListeners()
      .createGrid();
  }

  private addCanvasListeners(): Grid {
    this.canvas.subscribe(this.getCanvasListeners());

    return this;
  }

  private addWindowListeners(): Grid {
    window.addEventListener('DOMContentLoaded', this.onResize);
    window.addEventListener('resize', this.onResize);

    return this;
  }

  private createGrid(): Grid {
    for (let row = 0; row < CELLS_ON_SIDE; row += 1) {
      for (let column = 0; column < CELLS_ON_SIDE; column += 1) {
        const cell: Cell = {
          color: 'transparent',
          topLeftX: column * this.cellSize,
          topLeftY: row * this.cellSize,
        };

        this.grid.push(cell);
      }
    }

    return this;
  }

  private getCanvasListeners(): CanvasListeners {
    return {
      onMouseDown: this.onMouseDown,
      onMouseMove: this.onMouseMove,
      onMouseUp: this.onMouseUp,
    };
  }

  private getCell = ({ x, y }: Coordinates): Cell => {
    const row = Math.floor(x / this.cellSize);
    const column = Math.floor(y / this.cellSize);

    return this.grid[row + column * CELLS_ON_SIDE];
  };

  private getMouseActionCoordinates(event: MouseEvent): MouseActionCoordinates {
    return {
      start: this.latestCoordinates,
      end: this.canvas.getCanvasBasedCoordinates(event as MouseEvent),
    };
  }

  private onMouseDown: EventListener = (event: Event): void => {
    this.isMouseDown = true;

    const coordinates = this.getMouseActionCoordinates(event as MouseEvent);

    this.activeTool.onMouseDown(coordinates, this.getCell);

    this.latestCoordinates = coordinates.end;

    this.repaint();
  };

  private isInsideSameCell(coordinates: MouseActionCoordinates): boolean {
    const startCell = this.getCell(coordinates.start);
    const endCell = this.getCell(coordinates.end);

    return startCell === endCell;
  }

  private onMouseMove: EventListener = (event: Event): void => {
    if (!this.isMouseDown) {
      return;
    }

    const coordinates = this.getMouseActionCoordinates(event as MouseEvent);

    if (this.isInsideSameCell(coordinates)) {
      return;
    }

    this.latestCoordinates = coordinates.end;

    this.activeTool.onMouseMove(coordinates, this.getCell);

    this.repaint();
  };

  private onMouseUp: EventListener = (): void => {
    this.latestCoordinates = { x: 0, y: 0 };

    this.isMouseDown = false;
  };

  private onResize: EventListener = (): void => {
    const size = Math.min(this.container.clientWidth, this.container.clientHeight);

    this.canvas.resize(size);

    this.resize(size).repaint();
  };

  private repaint(): Grid {
    this.grid.forEach((cell) => {
      this.canvas.paint(cell, this.cellSize);
    });

    return this;
  }

  private resize(size: number): Grid {
    const ratio = size / (this.cellSize * CELLS_ON_SIDE);

    this.grid.forEach((cell) => {
      cell.topLeftX *= ratio;
      cell.topLeftY *= ratio;
    });

    this.cellSize *= ratio;

    return this;
  }
}

export default Grid;
