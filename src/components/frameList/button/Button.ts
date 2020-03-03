import './button.css';

class Button {
  public button: HTMLButtonElement = document.createElement('button');

  constructor(private name: string) {
    this.setClassList();
    this.setTitle();

    if (this.name === 'add') {
      this.setInnerText('NEW FRAME');
    }
  }

  // to src/utils
  static capitalize(name: string): string {
    return name[0].toUpperCase() + name.slice(1);
  }

  public subscribe(listener: EventListener): void {
    this.button.addEventListener('click', listener);
  }

  public unsubscribe(listener: EventListener): void {
    this.button.removeEventListener('click', listener);
  }

  public show(): void {
    this.button.hidden = false;
  }

  public hide(): void {
    this.button.hidden = true;
  }

  private setClassList(): void {
    const classList: string[] =
      this.name === 'add'
        ? [`button_frame-list_${this.name}`]
        : ['button', `button_frame-list_${this.name}`];

    this.button.classList.add(...classList);
  }

  private setTitle(): void {
    this.button.title = `${Button.capitalize(this.name)} frame`;
  }

  private setInnerText(text: string): void {
    this.button.innerText = text;
  }
}

export default Button;
