// entities
import DrawingCanvas from '../components/drawing-canvas/drawing-canvas';

// interfaces
import {
  Cell,
  Coordinates,
  DrawingCanvasListeners,
  MoveCoordinates,
} from '../components/interfaces';

const CELLS_ON_SIDE = 12;

class Grid {
  private drawingCanvas = new DrawingCanvas();

  private cellSideLength = this.drawingCanvas.canvas.height / CELLS_ON_SIDE;

  private grid: Cell[] = [];

  private previousActionEndCoordinates: Coordinates = { x: 0, y: 0 };

  constructor() {
    this.addWindowListeners();
    this.createGrid();
  }

  public addCanvasListeners(listeners: DrawingCanvasListeners): void {
    this.drawingCanvas.subscribe(listeners);
  }

  public getCell({ x, y }: Coordinates): Cell {
    const row = Math.floor(x / this.cellSideLength);
    const column = Math.floor(y / this.cellSideLength);

    return this.grid[row + column * CELLS_ON_SIDE];
  }

  public getContainer(): HTMLDivElement {
    return this.drawingCanvas.container;
  }

  public getCoordinates({ clientX, clientY }: MouseEvent): Coordinates {
    const { offsetTop, offsetLeft } = this.drawingCanvas.getOffsetProperties();

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

  public getSideLength(): number {
    return this.drawingCanvas.getSideLength();
  }

  public highlight(): void {
    this.drawingCanvas.highlight();
  }

  public repaint(): void {
    this.grid.forEach((cell) => {
      this.drawingCanvas.fill(cell, this.cellSideLength);
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
          topLeftX: column * this.cellSideLength,
          topLeftY: row * this.cellSideLength,
        };

        this.grid.push(cell);
      }
    }
  }

  private onResize: EventListener = (): void => {
    const sideLength = this.drawingCanvas.getSideLength();

    this.drawingCanvas.resize(sideLength);

    this.resize(sideLength);
    this.repaint();
  };

  private resize(sideLength: number): void {
    const ratio = sideLength / (this.cellSideLength * CELLS_ON_SIDE);

    this.grid.forEach((cell) => {
      cell.topLeftX *= ratio;
      cell.topLeftY *= ratio;
    });

    this.cellSideLength *= ratio;
  }
}

export default new Grid();
