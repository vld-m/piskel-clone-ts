import './board.css';

// entities
import Canvas from '../canvas/canvas';

// interfaces
import { BoardListeners, Cell, Coordinates } from '../interfaces';

class Board extends Canvas {
  public readonly container = document.createElement('div');

  constructor() {
    super();
    this.addWindowListeners();
    this.setContainerAttributes();
    this.renderCanvas();
  }

  public getCell({ x, y }: Coordinates): Cell {
    const row = Math.floor(x / this.cellSideLength);
    const column = Math.floor(y / this.cellSideLength);

    return this.grid[row + column * this.gridDimension];
  }

  public getCoordinates({ clientX, clientY }: MouseEvent): Coordinates {
    const { offsetTop, offsetLeft } = this.canvas;

    return {
      x: clientX - offsetLeft,
      y: clientY - offsetTop,
    };
  }

  public getSideLength(): number {
    return Math.min(this.container.clientWidth, this.container.clientHeight);
  }

  public highlight(): void {
    this.canvas.classList.add('board__canvas_highlighted');

    setTimeout(() => {
      this.canvas.classList.remove('board__canvas_highlighted');
    }, 250);
  }

  public subscribe({ onMouseDown, onMouseLeave, onMouseMove, onMouseUp }: BoardListeners): void {
    this.canvas.addEventListener('mousedown', onMouseDown);
    this.canvas.addEventListener('mouseleave', onMouseLeave);
    this.canvas.addEventListener('mousemove', onMouseMove);
    this.canvas.addEventListener('mouseup', onMouseUp);
  }

  private addWindowListeners(): void {
    window.addEventListener('DOMContentLoaded', this.onResize);
    window.addEventListener('resize', this.onResize);
  }

  private onResize: EventListener = (): void => {
    const sideLength = this.getSideLength();

    this.resize(sideLength);
  };

  private renderCanvas(): void {
    this.container.append(this.canvas);
  }

  private setContainerAttributes(): void {
    this.container.classList.add('container', 'board__container');
  }
}

export default new Board();
