import './placeholder.css';

const INDEX_SHIFT = 0.5;

class Placeholder {
  public readonly container = document.createElement('div');

  private position: number = INDEX_SHIFT;

  constructor() {
    this.setContainerAttributes();
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

  private setContainerAttributes(): void {
    this.container.classList.add('placeholder');
  }
}

export default Placeholder;
