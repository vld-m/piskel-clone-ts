import './canvas.css';

// interfaces
import { Cell } from '../interfaces';

class Canvas {
  protected canvas = document.createElement('canvas');

  protected context = this.canvas.getContext('2d', { desynchronized: true });

  protected grid: Cell[] = [];

  protected gridDimension = 12;

  protected cellSideLength = this.canvas.height / this.gridDimension;

  constructor() {
    this.addCanvasListeners();
    this.createGrid();
  }

  public repaint(): void {
    this.grid.forEach((cell) => {
      this.fill(cell, this.cellSideLength);
    });
  }

  protected resize(sideLength: number): void {
    // canvas
    this.canvas.width = sideLength;
    this.canvas.height = sideLength;

    // grid
    const ratio = sideLength / (this.cellSideLength * this.gridDimension);

    this.grid.forEach((cell) => {
      cell.topLeftX *= ratio;
      cell.topLeftY *= ratio;
    });

    this.cellSideLength *= ratio;

    this.repaint();
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
}

export default Canvas;
