import './board.css';

// entities
import Canvas from '../canvas/canvas';

// interfaces
import { BoardListeners } from '../interfaces';

class Board extends Canvas {
  public readonly container = document.createElement('div');

  constructor() {
    super();
    this.setContainerAttributes();
    this.renderCanvas();
  }

  public getOffsetProperties(): { offsetTop: number; offsetLeft: number } {
    return {
      offsetTop: this.canvas.offsetTop,
      offsetLeft: this.canvas.offsetLeft,
    };
  }

  public getSideLength(): number {
    return Math.min(this.container.clientWidth, this.container.clientHeight);
  }

  public highlight(): void {
    this.canvas.classList.add('board__canvas_highlighted');

    setTimeout(() => {
      this.canvas.classList.remove('board__canvas_highlighted');
    }, 500);
  }

  public subscribe({ onMouseDown, onMouseLeave, onMouseMove, onMouseUp }: BoardListeners): void {
    this.canvas.addEventListener('mousedown', onMouseDown);
    this.canvas.addEventListener('mouseleave', onMouseLeave);
    this.canvas.addEventListener('mousemove', onMouseMove);
    this.canvas.addEventListener('mouseup', onMouseUp);
  }

  private renderCanvas(): void {
    this.container.append(this.canvas);
  }

  private setContainerAttributes(): void {
    this.container.classList.add('container', 'board__container');
  }
}

export default Board;
