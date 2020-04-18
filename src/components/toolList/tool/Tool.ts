import './tool.css';

class Tool {
  static create(name: string): HTMLDivElement {
    const container = document.createElement('div');

    Tool.setContainerAttributes(container, name);
    Tool.loadStyles(name);

    return container;
  }

  static loadStyles(name: string): void {
    import(`./${name}/${name}.css`);
  }

  static setContainerAttributes(container: HTMLDivElement, name: string): void {
    container.classList.add('tool', `tool_${name}`);
  }
}

export default Tool;
