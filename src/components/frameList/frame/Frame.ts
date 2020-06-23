import './frame.css';

// entities
import Button from '../button/button';

// constants
import { BUTTONS } from '../constants';

// interfaces
import { FrameListeners } from '../interfaces';

class Frame {
  public readonly canvas = document.createElement('canvas');

  public readonly container = document.createElement('div');

  private context = this.canvas.getContext('2d');

  private buttonCopy = new Button(BUTTONS.COPY);

  private buttonDelete = new Button(BUTTONS.DELETE);

  private buttonMove = new Button(BUTTONS.MOVE);

  private index = document.createElement('div');

  constructor() {
    this.addWindowListeners();
    this.setContainerAttributes();
    this.renderIndex();
    this.renderCanvas();
    this.renderButtons();
  }

  public deselect(): void {
    this.container.classList.remove('frame__container_active');
  }

  public hideButtonsDeleteAndMove(): void {
    this.buttonDelete.hide();
    this.buttonMove.hide();
  }

  public hideIndex(): void {
    this.index.classList.add('frame__index_hidden');
  }

  public hide(): void {
    this.container.classList.add('frame__container_hidden');
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

  public showButtonsDeleteAndMove(): void {
    this.buttonDelete.show();
    this.buttonMove.show();
  }

  public showIndex(): void {
    this.index.classList.remove('frame__index_hidden');
  }

  public show(): void {
    this.container.classList.remove('frame__container_hidden');
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

  private addWindowListeners(): void {
    window.addEventListener('DOMContentLoaded', this.onResize);
    window.addEventListener('resize', this.onResize);
  }

  private onResize = (): void => {
    const size = this.container.clientWidth;

    this.canvas.width = size;
    this.canvas.height = size;
  };

  private renderCanvas(): void {
    setTimeout(() => this.onResize());

    this.container.append(this.canvas);
  }

  private renderButtons(): void {
    this.container.append(this.buttonDelete.button, this.buttonMove.button, this.buttonCopy.button);
  }

  private renderIndex(): void {
    this.index.classList.add('frame__index');

    this.container.append(this.index);
  }

  private repaint(size: number, snap: ImageData): void {
    if (this.context) {
      this.context.putImageData(snap, 0, 0, 0, 0, size, size);
    }
  }

  private setContainerAttributes(): void {
    this.container.classList.add('frame__container');

    this.container.draggable = true;
  }
}

export default Frame;
