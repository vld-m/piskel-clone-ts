import './frame.css';

// entities
import Button from '../button/button';

// constants
import { BUTTONS } from '../constants';

// interfaces
import { FrameListeners } from '../interfaces';

class Frame {
  public container = document.createElement('div');

  private buttonCopy = new Button(BUTTONS.COPY);

  private buttonDelete = new Button(BUTTONS.DELETE);

  private buttonMove = new Button(BUTTONS.MOVE);

  private index = document.createElement('div');

  constructor() {
    this.setContainerAttributes();
    this.renderIndex();
    this.renderButtons();
  }

  public deselect(): void {
    this.container.classList.remove('frame_active');
  }

  public hideButtonsDeleteAndMove(): void {
    this.buttonDelete.hide();
    this.buttonMove.hide();
  }

  public hideIndex(): void {
    this.index.classList.add('index_hidden');
  }

  public hide(): void {
    this.container.classList.add('frame_hidden');
  }

  public remove(): void {
    this.container.remove();
  }

  public select(): void {
    this.container.classList.add('frame_active');
  }

  public setIndex(index: number): void {
    this.index.innerText = `${index}`;
  }

  public showButtonsDeleteAndMove(): void {
    this.buttonDelete.show();
    this.buttonMove.show();
  }

  public showIndex(): void {
    this.index.classList.remove('index_hidden');
  }

  public show(): void {
    this.container.classList.remove('frame_hidden');
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

  private setContainerAttributes(): void {
    this.container.classList.add('frame');
    this.container.draggable = true;
  }

  private renderButtons(): void {
    this.container.append(this.buttonDelete.button, this.buttonMove.button, this.buttonCopy.button);
  }

  private renderIndex(): void {
    this.index.classList.add('index');
    this.container.append(this.index);
  }
}

export default Frame;
