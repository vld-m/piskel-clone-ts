import './board.css';

// entities
import Canvas from '../canvas/canvas';
import emitter from '../../utils/emitter';

// interfaces
import { BoardListeners, Cell, Coordinates } from '../interfaces';

// constants
import { EVENTS } from '../constants';

class Board extends Canvas {
  public readonly container = document.createElement('div');

  constructor() {
    super();
    this.addBoardListeners();
    this.setContainerAttributes();
    this.renderCanvas();
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

  private addBoardListeners(): void {
    window.addEventListener('DOMContentLoaded', this.onResize);
    window.addEventListener('resize', this.onResize);

    emitter.on(EVENTS.FRAME_CHANGE, this.onFrameChange);
  }

  private onFrameChange = ([frameGrid, frameSideLength]: [Cell[], number]): void => {
    this.setGrid(frameGrid);

    this.resizeGrid(this.getSideLength() / frameSideLength);

    this.repaint();
  };

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
