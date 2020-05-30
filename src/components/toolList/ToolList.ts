import './toolList.css';

import ActiveTool from './ActiveTool';

import { isHTMLElement } from '../../utils/typeGuards';

import TOOLS from './constants';

class ToolList {
  public activeTool = new ActiveTool();

  public container = document.createElement('div');

  private activeToolContainer: HTMLElement | null = null;

  public initialize(): void {
    this.setContainerAttributes();
    this.addListenersToContainer();
    this.renderToolContainers();
    this.loadInitialTool();
  }

  private addListenersToContainer(): void {
    this.container.addEventListener('click', this.onSelect);
  }

  private async loadInitialTool(): Promise<void> {
    const toolContainer = document.querySelector(`.tool_${TOOLS.PEN}`);

    if (toolContainer === null || !isHTMLElement(toolContainer)) {
      return;
    }

    this.selectActiveToolContainer(toolContainer);
    this.activeTool.set(TOOLS.PEN);
  }

  private onSelect: EventListener = async ({ target }: Event): Promise<void> => {
    if (target === null || !isHTMLElement(target)) {
      return;
    }

    const toolContainer = target.closest('.tool');

    if (toolContainer === null || !isHTMLElement(toolContainer)) {
      return;
    }

    this.selectActiveToolContainer(toolContainer);
    this.activeTool.set(toolContainer.dataset.name as string);
  };

  private renderToolContainers(): void {
    const createToolContainer = (name: string): HTMLDivElement => {
      const toolContainer = document.createElement('div');

      import(`./tool/${name}/${name}.css`);

      toolContainer.classList.add('tool', `tool_${name}`);
      toolContainer.dataset.name = `${name}`;

      return toolContainer;
    };

    this.container.append(...Object.values(TOOLS).map(createToolContainer));
  }

  private selectActiveToolContainer(container: HTMLElement): void {
    if (this.activeToolContainer) {
      this.activeToolContainer.classList.remove('tool_active');
    }

    this.activeToolContainer = container;

    this.activeToolContainer.classList.add('tool_active');
  }

  private setContainerAttributes(): void {
    this.container.classList.add('container', 'container_tool-list');
  }
}

export default new ToolList();
