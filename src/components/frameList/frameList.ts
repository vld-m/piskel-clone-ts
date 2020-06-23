import './frameList.css';

// entities
import Frame from './frame/frame';
import Placeholder from './placeholder/placeholder';
import Button from './button/button';

// type guards
import { isHTMLElement } from '../typeGuards';

// constants
import { BUTTONS } from './constants';

// interfaces
import { FrameListeners } from './interfaces';

class FrameList {
  public readonly container = document.createElement('div');

  public currentFrame: Frame | null = null;

  private buttonAdd = new Button(BUTTONS.ADD);

  private draggedFrame: Frame | null = null;

  private frameList: Frame[] = [];

  private placeholder = new Placeholder();

  constructor() {
    this.setContainerAttributes();
    this.addListenersToBody();
    this.renderInitialFrame();
    this.renderPlaceholder();
    this.renderButtonAdd();
  }

  private static isButton(target: HTMLElement): boolean {
    return !!target.closest('.frame__button');
  }

  private addListenersToBody(): void {
    document.body.addEventListener('dragover', this.onDragOver);
    document.body.addEventListener('drop', this.onDrop);
  }

  private getFrameAndIndex(
    target: HTMLElement
  ): {
    targetFrame: Frame;
    targetIndex: number;
  } {
    const targetIndex = this.frameList.findIndex(
      (frame) => frame.container === target.closest('.frame__container')
    );
    const targetFrame = this.frameList[targetIndex];

    return { targetFrame, targetIndex };
  }

  private getFrameListeners(): FrameListeners {
    return {
      onCopy: this.onCopy,
      onDelete: this.onDelete,
      onDragEnter: this.onDragEnter,
      onDragStart: this.onDragStart,
      onSelect: this.onSelect,
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
    this.updateIndexes();
  };

  private onCopy: EventListener = ({ target }: Event): void => {
    if (target === null || !isHTMLElement(target)) {
      return;
    }

    const { targetFrame } = this.getFrameAndIndex(target);
    const newFrame = new Frame();

    newFrame.subscribe(this.getFrameListeners());
    targetFrame.container.after(newFrame.container);

    this.updateCurrentFrame(newFrame);
    this.updateFrameList(newFrame);
    this.updateIndexes();
  };

  private onDelete: EventListener = ({ target }: Event): void => {
    if (target === null || !isHTMLElement(target)) {
      return;
    }

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

    this.updateIndexes();

    if (this.currentFrame && this.frameList.length === 1) {
      this.currentFrame.hideIndex();
      this.currentFrame.hideButtonsDeleteAndMove();
    }
  };

  private onDragEnter: EventListener = ({ target }: Event): void => {
    if (target === null || !isHTMLElement(target)) {
      return;
    }

    const { targetFrame, targetIndex } = this.getFrameAndIndex(target);
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

  private onDragStart: EventListener = ({ target }: Event): void => {
    if (target === null || !isHTMLElement(target)) {
      return;
    }

    const { targetFrame, targetIndex } = this.getFrameAndIndex(target);

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
      this.updateIndexes();
    }

    this.draggedFrame = null;
  };

  private onSelect: EventListener = ({ target }: Event): void => {
    if (target === null || !isHTMLElement(target) || FrameList.isButton(target)) {
      return;
    }

    const { targetFrame } = this.getFrameAndIndex(target);

    if (targetFrame !== this.currentFrame) {
      this.updateCurrentFrame(targetFrame);
    }
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
    this.placeholder.hide();
  }

  private setContainerAttributes(): void {
    this.container.classList.add('container', 'frame-list__container');
  }

  private updateCurrentFrame(frame: Frame): void {
    if (this.currentFrame) {
      this.currentFrame.deselect();

      if (this.frameList.length === 1) {
        this.currentFrame.showIndex();
        this.currentFrame.showButtonsDeleteAndMove();
      }
    }

    this.currentFrame = frame;
    this.currentFrame.select();
  }

  private updateFrameList(newFrame: Frame): void {
    const containerList = Array.from(this.container.children).filter(
      (element) => element !== this.buttonAdd.button
    );

    this.frameList = containerList.map(
      (container) => this.mapContainerToFrame(container) || newFrame
    );
  }

  private updateIndexes(): void {
    this.frameList.forEach((frame, index) => frame.setIndex(index + 1));
  }
}

export default new FrameList();
