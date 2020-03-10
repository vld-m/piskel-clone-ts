import './button.css';

class Button {
  public button = document.createElement('button');

  constructor(private name: string) {
    if (this.name === 'add') {
      this.setInnerText('NEW FRAME');
    }

    this.setButtonAttributes();
  }

  // to src/utils
  static capitalize(name: string): string {
    return name[0].toUpperCase() + name.slice(1);
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
    const classList =
      this.name === 'add'
        ? [`button_frame-list_${this.name}`]
        : ['button', `button_frame-list_${this.name}`];

    this.button.classList.add(...classList);
    this.button.title = `${Button.capitalize(this.name)} frame`;
  }

  private setInnerText(text: string): void {
    this.button.innerText = text;
  }
}

export default Button;
