import './frameList.css';

import { Frame, FrameListeners } from './frame/Frame';
import { Placeholder, PlaceholderListeners } from './placeholder/Placeholder';
import Button from './button/Button';

interface FrameAndIndex {
  targetFrame: Frame;
  targetIndex: number;
}

class FrameList {
  public container = document.createElement('div');

  private buttonAdd = new Button('add');

  private currentFrame: Frame | null = null;

  private draggedFrame: Frame | null = null;

  private frameList: Frame[] = [];

  private placeholder = new Placeholder();

  public initialize(): void {
    this.setAttributes();
    this.renderInitialFrame();
    this.renderPlaceholder();
    this.renderButtonAdd();
  }

  private getFrameAndIndex(target: EventTarget | null): FrameAndIndex {
    const targetIndex = this.frameList.findIndex(
      (frame) => frame.container === (target as HTMLElement).closest('.frame')
    );
    const targetFrame = this.frameList[targetIndex];

    return { targetFrame, targetIndex };
  }

  private getFrameListeners(): FrameListeners {
    return {
      onDelete: this.onDelete,
      onCopy: this.onCopy,
      onDragStart: this.onDragStart,
      onDragEnter: this.onDragEnter,
    };
  }

  private getPlaceholderListeners(): PlaceholderListeners {
    return {
      onDragOver: this.onDragOver,
      onDrop: this.onDrop,
    };
  }

  private mapContainerToFrame(container: Element): Frame | undefined {
    return this.frameList.find((frame) => frame.container === container);
  }

  private onAdd: EventListener = (): void => {
    const newFrame = new Frame();

    newFrame.subscribe(this.getFrameListeners());
    this.buttonAdd.button.before(newFrame.container);

    this.updateCurrentFrame(newFrame);
    this.updateFrameList(newFrame);
  };

  private onCopy: EventListener = ({ target }: Event): void => {
    const { targetFrame } = this.getFrameAndIndex(target);
    const newFrame = new Frame();

    newFrame.subscribe(this.getFrameListeners());
    targetFrame.container.after(newFrame.container);

    this.updateCurrentFrame(newFrame);
    this.updateFrameList(newFrame);
  };

  private onDelete: EventListener = ({ target }: Event): void => {
    const { targetFrame, targetIndex } = this.getFrameAndIndex(target);

    // remove target frame from the frame list
    targetFrame.unsubscribe(this.getFrameListeners());
    targetFrame.remove();

    if (targetFrame === this.currentFrame) {
      // update current frame
      this.currentFrame.deselect();
      this.currentFrame = targetIndex === 0 ? this.frameList[1] : this.frameList[targetIndex - 1];
      this.currentFrame.select();
    }

    this.frameList = [
      ...this.frameList.slice(0, targetIndex),
      ...this.frameList.slice(targetIndex + 1),
    ];

    if (this.currentFrame && this.frameList.length === 1) {
      this.currentFrame.hideButtonsDeleteAndMove();
    }
  };

  private onDragEnter: EventListener = (event: Event): void => {
    const { targetFrame, targetIndex } = this.getFrameAndIndex(event.target);
    const placeholderIndex = this.placeholder.getPosition();

    if (placeholderIndex > targetIndex) {
      targetFrame.container.before(this.placeholder.container);
      this.placeholder.setPositionBefore(targetIndex);
    } else {
      targetFrame.container.after(this.placeholder.container);
      this.placeholder.setPositionAfter(targetIndex);
    }
  };

  private onDragOver: EventListener = (event: Event): void => {
    event.preventDefault();
  };

  private onDragStart: EventListener = (event: Event): void => {
    const { targetFrame, targetIndex } = this.getFrameAndIndex(event.target);

    this.draggedFrame = targetFrame;

    this.placeholder.show();
    this.placeholder.setPosition(targetIndex);

    requestAnimationFrame(() => {
      targetFrame.hide();
      targetFrame.container.replaceWith(this.placeholder.container);
    });
  };

  private onDrop: EventListener = (event: Event): void => {
    event.preventDefault();

    if (this.draggedFrame) {
      this.draggedFrame.show();
      this.placeholder.container.replaceWith(this.draggedFrame.container);

      this.updateFrameList(this.draggedFrame);
    }

    this.draggedFrame = null;
  };

  private renderButtonAdd(): void {
    this.buttonAdd.subscribe(this.onAdd);

    this.container.append(this.buttonAdd.button);
  }

  private renderInitialFrame(): void {
    const newFrame = new Frame();

    newFrame.subscribe(this.getFrameListeners());
    newFrame.hideButtonsDeleteAndMove();
    this.container.append(newFrame.container);

    this.updateCurrentFrame(newFrame);
    this.updateFrameList(newFrame);
  }

  private renderPlaceholder(): void {
    this.placeholder.subscribe(this.getPlaceholderListeners());
    this.placeholder.hide();
  }

  private setAttributes(): void {
    this.container.classList.add('container', 'container_frame-list');
  }

  private updateCurrentFrame(frame: Frame): void {
    if (this.currentFrame) {
      this.currentFrame.deselect();

      if (this.frameList.length === 1) {
        this.currentFrame.showButtonsDeleteAndMove();
      }
    }

    this.currentFrame = frame;
    this.currentFrame.select();
  }

  private updateFrameList(newFrame: Frame): void {
    const frameListContainer = document.querySelector('.container_frame-list') as HTMLDivElement;
    const containerList = Array.from(frameListContainer.children).filter(
      (element) => element !== this.buttonAdd.button
    );

    this.frameList = containerList.map(
      (container) => this.mapContainerToFrame(container) || newFrame
    );
  }
}

export default FrameList;
