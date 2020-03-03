import './frameList.css';

import { Frame, FrameListeners } from './frame/Frame';
import Button from './button/Button';

class FrameList {
  public container: HTMLDivElement = document.createElement('div');

  private currentFrame: Frame = new Frame();

  private frameList: Frame[] = [this.currentFrame];

  private buttonAdd: Button = new Button('add');

  constructor() {
    this.setClassList();
    this.renderInitialFrame();
    this.renderButtonAdd();
  }

  private setClassList(): void {
    this.container.classList.add('container', 'container_frame-list');
  }

  private renderInitialFrame(): void {
    this.currentFrame.subscribe(this.getFrameListeners());
    this.currentFrame.select();
    this.currentFrame.hideButtonsDeleteAndMove();

    this.container.append(this.currentFrame.container);
  }

  private renderButtonAdd(): void {
    this.buttonAdd.subscribe(this.onAdd);

    this.container.append(this.buttonAdd.button);
  }

  private getFrameListeners(): FrameListeners {
    return {
      onDelete: this.onDelete,
    };
  }

  private onAdd: EventListener = (): void => {
    if (this.frameList.length === 1) {
      this.currentFrame.showButtonsDeleteAndMove();
    }

    this.currentFrame.deselect();
    this.currentFrame = new Frame();
    this.currentFrame.subscribe(this.getFrameListeners());
    this.currentFrame.select();

    this.frameList = [...this.frameList, this.currentFrame];

    this.buttonAdd.button.before(this.currentFrame.container);
  };

  private onDelete: EventListener = ({ target }: Event): void => {
    const targetFrameIndex = this.frameList.findIndex(
      (frame) => frame.container === (target as HTMLElement).closest('.frame')
    );
    const targetFrame = this.frameList[targetFrameIndex];

    if (targetFrame === this.currentFrame) {
      // switch current frame
      this.currentFrame.deselect();

      this.currentFrame =
        targetFrameIndex === 0
          ? this.frameList[targetFrameIndex + 1]
          : this.frameList[targetFrameIndex - 1];

      this.currentFrame.select();
    }

    // remove target frame from the frame list
    targetFrame.unsubscribe(this.getFrameListeners());
    targetFrame.remove();

    this.frameList = [
      ...this.frameList.slice(0, targetFrameIndex),
      ...this.frameList.slice(targetFrameIndex + 1),
    ];

    if (this.frameList.length === 1) {
      this.currentFrame.hideButtonsDeleteAndMove();
    }
  };
}

export default FrameList;
