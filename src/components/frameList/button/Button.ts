import './button.css';

// constants
import BUTTONS from '../constants';

class Button {
  public button = document.createElement('button');

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
      ? [`button_frame-list_${buttonName}`]
      : ['button', `button_frame-list_${buttonName}`];
  }

  public hide(): void {
    this.button.classList.add('button_hidden');
  }

  public show(): void {
    this.button.classList.remove('button_hidden');
  }

  public subscribe(listener: EventListener): void {
    this.button.addEventListener('click', listener);
  }

  public unsubscribe(listener: EventListener): void {
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

export default Button;
