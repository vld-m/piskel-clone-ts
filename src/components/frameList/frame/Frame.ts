import './frame.css';

import Button from '../button/Button';

interface FrameListeners {
  onDelete: EventListener;
  onCopy: EventListener;
  onDragStart: EventListener;
  onDragEnter: EventListener;
}

class Frame {
  public container = document.createElement('div');

  private buttonCopy = new Button('copy');

  private buttonDelete = new Button('delete');

  private buttonMove = new Button('move');

  constructor() {
    this.setAttributes();
    this.renderButtons();
  }

  public deselect(): void {
    this.container.classList.remove('frame_selected');
  }

  public hideButtonsDeleteAndMove(): void {
    this.buttonDelete.hide();
    this.buttonMove.hide();
  }

  public hide(): void {
    this.container.classList.add('frame_hidden');
  }

  public remove(): void {
    this.container.remove();
  }

  public select(): void {
    this.container.classList.add('frame_selected');
  }

  public showButtonsDeleteAndMove(): void {
    this.buttonDelete.show();
    this.buttonMove.show();
  }

  public show(): void {
    this.container.classList.remove('frame_hidden');
  }

  public subscribe({ onDragStart, onDragEnter, onDelete, onCopy }: FrameListeners): void {
    this.container.addEventListener('dragstart', onDragStart);
    this.container.addEventListener('dragenter', onDragEnter);

    this.buttonDelete.subscribe(onDelete);
    this.buttonCopy.subscribe(onCopy);
  }

  public unsubscribe({ onDragStart, onDragEnter, onDelete, onCopy }: FrameListeners): void {
    this.container.removeEventListener('dragstart', onDragStart);
    this.container.removeEventListener('dragenter', onDragEnter);

    this.buttonDelete.unsubscribe(onDelete);
    this.buttonCopy.unsubscribe(onCopy);
  }

  private setAttributes(): void {
    this.container.classList.add('frame');
    this.container.draggable = true;
  }

  private renderButtons(): void {
    const buttons = [this.buttonDelete.button, this.buttonMove.button, this.buttonCopy.button];

    this.container.append(...buttons);
  }
}

export { Frame, FrameListeners };
