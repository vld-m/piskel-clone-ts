import './frame.css';

// entities
import Button from '../button/button';
import Canvas from '../../canvas/canvas';

// constants
import { BUTTONS } from '../constants';

// interfaces
import { FrameListeners } from '../interfaces';
import { Coordinates } from '../../interfaces';

class Frame extends Canvas {
  public readonly container = document.createElement('div');

  private buttonCopy = new Button(BUTTONS.COPY);

  private buttonDelete = new Button(BUTTONS.DELETE);

  private buttonMove = new Button(BUTTONS.MOVE);

  private index = document.createElement('div');

  constructor() {
    super();
    this.addFrameListeners();
    this.setContainerAttributes();
    this.renderCanvas();
    this.renderIndex();
    this.renderButtons();
  }

  public deselect(): void {
    this.container.classList.remove('frame__container_active');
  }

  public getCoordinates(boardCoordinates: Coordinates, boardSideLength: number): Coordinates {
    const ratio = this.getSideLength() / boardSideLength;

    return {
      x: boardCoordinates.x * ratio,
      y: boardCoordinates.y * ratio,
    };
  }

  public hide(): void {
    this.container.classList.add('frame__container_hidden');
  }

  public hideButtonsDeleteAndMove(): void {
    this.buttonDelete.hide();
    this.buttonMove.hide();
  }

  public hideIndex(): void {
    this.index.classList.add('frame__index_hidden');
  }

  public remove(): void {
    this.container.remove();
  }

  public select(): void {
    this.container.classList.add('frame__container_active');
  }

  public setIndex(index: number): void {
    this.index.innerText = `${index}`;
  }

  public show(): void {
    this.container.classList.remove('frame__container_hidden');
  }

  public showButtonsDeleteAndMove(): void {
    this.buttonDelete.show();
    this.buttonMove.show();
  }

  public showIndex(): void {
    this.index.classList.remove('frame__index_hidden');
  }

  public subscribe({ onDragEnter, onDragStart, onSelect, onCopy, onDelete }: FrameListeners): void {
    this.container.addEventListener('dragenter', onDragEnter);
    this.container.addEventListener('dragstart', onDragStart);
    this.container.addEventListener('click', onSelect);

    this.buttonCopy.subscribe(onCopy);
    this.buttonDelete.subscribe(onDelete);
  }

  public unsubscribe({
    onDragEnter,
    onDragStart,
    onSelect,
    onCopy,
    onDelete,
  }: FrameListeners): void {
    this.container.removeEventListener('dragenter', onDragEnter);
    this.container.removeEventListener('dragstart', onDragStart);
    this.container.removeEventListener('click', onSelect);

    this.buttonCopy.unsubscribe(onCopy);
    this.buttonDelete.unsubscribe(onDelete);
  }

  private addFrameListeners(): void {
    window.addEventListener('DOMContentLoaded', this.onResize);
    window.addEventListener('resize', this.onResize);
  }

  private getSideLength(): number {
    return Math.min(this.container.clientWidth, this.container.clientHeight);
  }

  private onResize = (): void => {
    this.resize(this.getSideLength());
  };

  private renderButtons(): void {
    this.container.append(this.buttonDelete.button, this.buttonMove.button, this.buttonCopy.button);
  }

  private renderCanvas(): void {
    setTimeout(() => this.onResize());

    this.container.append(this.canvas);
  }

  private renderIndex(): void {
    this.index.classList.add('frame__index');

    this.container.append(this.index);
  }

  private setContainerAttributes(): void {
    this.container.classList.add('frame__container');

    this.container.draggable = true;
  }
}

export default Frame;
