// constants
import { BUTTONS } from '../constants';

export class Button {
  public readonly button = document.createElement('button');

  constructor(private name: string) {
    if (this.name === BUTTONS.ADD) {
      this.setInnerText('NEW FRAME');
    }

    this.setButtonAttributes();
  }

  // to src/utils
  static capitalize(name: string): string {
    return name[0].toUpperCase() + name.slice(1);
  }

  static getClassList(buttonName: string): string[] {
    return buttonName === BUTTONS.ADD
      ? [`frame-list__button_${buttonName}`]
      : ['frame__button', `frame__button_${buttonName}`];
  }

  public hide(): void {
    this.button.classList.add('frame__button_hidden');
  }

  public show(): void {
    this.button.classList.remove('frame__button_hidden');
  }

  public subscribe(listener: (event: MouseEvent) => void): void {
    this.button.addEventListener('click', listener);
  }

  public unsubscribe(listener: (event: MouseEvent) => void): void {
    this.button.removeEventListener('click', listener);
  }

  private setButtonAttributes(): void {
    this.button.classList.add(...Button.getClassList(this.name));
    this.button.title = `${Button.capitalize(this.name)} frame`;
  }

  private setInnerText(text: string): void {
    this.button.innerText = text;
  }
}
