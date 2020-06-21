// entities
import Canvas from '../canvas';

// interfaces
import { CanvasListeners, Cell, Coordinates, MoveCoordinates } from '../../interfaces';

const CELLS_ON_SIDE = 12;

class Grid {
  private canvas = new Canvas();

  private cellSize = this.canvas.getCanvas().height / CELLS_ON_SIDE;

  private grid: Cell[] = [];

  private previousActionEndCoordinates: Coordinates = { x: 0, y: 0 };

  constructor() {
    this.addWindowListeners();
    this.createGrid();
  }

  public addCanvasListeners(listeners: CanvasListeners): void {
    this.canvas.subscribe(listeners);
  }

  public getCell({ x, y }: Coordinates): Cell {
    const row = Math.floor(x / this.cellSize);
    const column = Math.floor(y / this.cellSize);

    return this.grid[row + column * CELLS_ON_SIDE];
  }

  public getContainer(): HTMLDivElement {
    return this.canvas.getContainer();
  }

  public getCoordinates({ clientX, clientY }: MouseEvent): Coordinates {
    const { offsetTop, offsetLeft } = this.canvas.getOffsetProperties();

    const xDiff = clientX - offsetLeft;
    const yDiff = clientY - offsetTop;

    return { x: xDiff, y: yDiff };
  }

  public getMoveCoordinates(event: MouseEvent): MoveCoordinates {
    return {
      start: this.previousActionEndCoordinates,
      end: this.getCoordinates(event),
    };
  }

  public getSize(): number {
    return this.canvas.getSize();
  }

  public highlight(): void {
    this.canvas.highlight();
  }

  public repaint(): void {
    this.grid.forEach((cell) => {
      this.canvas.paint(cell, this.cellSize);
    });
  }

  public setPreviousActionEndCoordinates(coordinates: Coordinates): void {
    this.previousActionEndCoordinates = coordinates;
  }

  private addWindowListeners(): void {
    window.addEventListener('DOMContentLoaded', this.onResize);
    window.addEventListener('resize', this.onResize);
  }

  private createGrid(): void {
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
  }

  private onResize: EventListener = (): void => {
    const { clientWidth, clientHeight } = this.canvas.getContainer();
    const size = Math.min(clientWidth, clientHeight);

    this.canvas.resize(size);

    this.resize(size);
    this.repaint();
  };

  private resize(size: number): void {
    const ratio = size / (this.cellSize * CELLS_ON_SIDE);

    this.grid.forEach((cell) => {
      cell.topLeftX *= ratio;
      cell.topLeftY *= ratio;
    });

    this.cellSize *= ratio;
  }
}

export default new Grid();
