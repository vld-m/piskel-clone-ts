import './frame.css';

import Button from '../button/Button';

interface FrameListeners {
  onDelete: EventListener;
}

class Frame {
  public container: HTMLDivElement = document.createElement('div');

  private buttonDelete: Button = new Button('delete');

  private buttonCopy: Button = new Button('copy');

  private buttonMove: Button = new Button('move');

  constructor() {
    this.setClassList();
    this.renderButtons();
  }

  public remove(): void {
    this.container.remove();
  }

  public subscribe({ onDelete }: FrameListeners): void {
    this.buttonDelete.subscribe(onDelete);
  }

  public unsubscribe({ onDelete }: FrameListeners): void {
    this.buttonDelete.unsubscribe(onDelete);
  }

  public select(): void {
    this.container.classList.add('frame_selected');
  }

  public deselect(): void {
    this.container.classList.remove('frame_selected');
  }

  public showButtonsDeleteAndMove(): void {
    this.buttonDelete.show();
    this.buttonMove.show();
  }

  public hideButtonsDeleteAndMove(): void {
    this.buttonDelete.hide();
    this.buttonMove.hide();
  }

  private setClassList(): void {
    this.container.classList.add('frame');
  }

  private renderButtons(): void {
    const buttons: HTMLButtonElement[] = [
      this.buttonDelete.button,
      this.buttonMove.button,
      this.buttonCopy.button,
    ];

    this.container.append(...buttons);
  }
}

export { Frame, FrameListeners };
