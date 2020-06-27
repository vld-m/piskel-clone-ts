import './canvas.css';

// interfaces
import { Cell, Coordinates } from '../interfaces';

class Canvas {
  protected canvas = document.createElement('canvas');

  protected context = this.canvas.getContext('2d', { desynchronized: true });

  private grid: Cell[] = [];

  private gridDimension = 12;

  private cellSideLength = this.canvas.height / this.gridDimension;

  constructor() {
    this.addCanvasListeners();
    this.createGrid();
  }

  public getCell({ x, y }: Coordinates): Cell {
    const row = Math.floor(x / this.cellSideLength);
    const column = Math.floor(y / this.cellSideLength);

    return this.grid[row + column * this.gridDimension];
  }

  public repaint(): void {
    this.grid.forEach((cell) => {
      this.fill(cell, this.cellSideLength);
    });
  }

  protected resize(sideLength: number): void {
    this.resizeCanvas(sideLength);

    this.resizeGrid(sideLength / (this.cellSideLength * this.gridDimension));

    this.repaint();
  }

  protected resizeGrid(ratio: number): void {
    this.grid.forEach((cell) => {
      cell.topLeftX *= ratio;
      cell.topLeftY *= ratio;
    });

    this.cellSideLength *= ratio;
  }

  protected setGrid(grid: Cell[]): void {
    this.grid = grid;
  }

  private addCanvasListeners(): void {
    this.canvas.addEventListener('contextmenu', this.onContextMenu);
  }

  private createGrid(): void {
    for (let row = 0; row < this.gridDimension; row += 1) {
      for (let column = 0; column < this.gridDimension; column += 1) {
        const cell: Cell = {
          color: 'transparent',
          topLeftX: column * this.cellSideLength,
          topLeftY: row * this.cellSideLength,
        };

        this.grid.push(cell);
      }
    }
  }

  private fill({ color, topLeftX, topLeftY }: Cell, sideLength: number): void {
    if (this.context === null) {
      return;
    }

    this.context.fillStyle = color;
    this.context.fillRect(topLeftX, topLeftY, sideLength, sideLength);
  }

  private onContextMenu: EventListener = (event: Event): void => {
    event.preventDefault();
  };

  private resizeCanvas(sideLength: number): void {
    this.canvas.width = sideLength;
    this.canvas.height = sideLength;
  }
}

export default Canvas;
