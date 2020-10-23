import './canvas.css';

// types
import { Cell } from '../types';

export class Canvas {
  public grid: Cell[] = [];

  protected canvas = document.createElement('canvas');

  protected context = this.canvas.getContext('2d', { desynchronized: true });

  protected gridDimension = 12;

  protected cellSideLength = this.canvas.width / this.gridDimension;

  constructor() {
    this.addCanvasListeners().createGrid();
  }

  public mapColors(grid: Cell[]): Canvas {
    grid.forEach(({ color }, cellIndex) => {
      this.grid[cellIndex].color = color;
    });

    return this;
  }

  public repaint(): Canvas {
    this.grid.forEach((cell) => {
      this.fill(cell, this.cellSideLength);
    });

    return this;
  }

  protected clear(): Canvas {
    if (this.context === null) {
      return this;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.width);

    return this;
  }

  protected resize(sideLength: number): Canvas {
    this.resizeCanvas(sideLength)
      .resizeGrid(sideLength / (this.cellSideLength * this.gridDimension))
      .repaint();

    return this;
  }

  private addCanvasListeners(): Canvas {
    this.canvas.addEventListener('contextmenu', this.onContextMenu);

    return this;
  }

  private createGrid(): Canvas {
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

    return this;
  }

  private fill({ color, topLeftX, topLeftY }: Cell, sideLength: number): Canvas {
    if (this.context === null) {
      return this;
    }

    this.context.fillStyle = color;
    this.context.fillRect(topLeftX, topLeftY, sideLength, sideLength);

    return this;
  }

  private onContextMenu = (event: Event): void => {
    event.preventDefault();
  };

  private resizeCanvas(sideLength: number): Canvas {
    this.canvas.width = sideLength;
    this.canvas.height = sideLength;

    return this;
  }

  private resizeGrid(ratio: number): Canvas {
    this.grid.forEach((cell) => {
      cell.topLeftX *= ratio;
      cell.topLeftY *= ratio;
    });

    this.cellSideLength *= ratio;

    return this;
  }
}
