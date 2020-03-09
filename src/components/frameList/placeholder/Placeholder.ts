import './placeholder.css';

interface PlaceholderListeners {
  onDragOver: EventListener;
  onDrop: EventListener;
}

const INDEX_SHIFT = 0.5;

class Placeholder {
  public container = document.createElement('div');

  private position: number = INDEX_SHIFT;

  constructor() {
    this.setAttributes();
  }

  public getPosition(): number {
    return this.position;
  }

  public hide(): void {
    this.container.classList.add('placeholder_hidden');
  }

  public setPositionAfter(targetIndex: number): void {
    this.position = targetIndex + INDEX_SHIFT;
  }

  public setPositionBefore(targetIndex: number): void {
    this.position = targetIndex - INDEX_SHIFT;
  }

  public setPosition(targetIndex: number): void {
    this.position = targetIndex;
  }

  public show(): void {
    this.container.classList.remove('placeholder_hidden');
  }

  public subscribe({ onDragOver, onDrop }: PlaceholderListeners): void {
    this.container.addEventListener('dragover', onDragOver);
    this.container.addEventListener('drop', onDrop);
  }

  private setAttributes(): void {
    this.container.classList.add('placeholder');
  }
}

export { Placeholder, PlaceholderListeners };
