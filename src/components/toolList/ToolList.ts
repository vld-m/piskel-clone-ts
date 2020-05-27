import './toolList.css';

import ActiveTool from './tool/ActiveTool';

import { isHTMLElement } from '../../utils/typeGuards';

import TOOLS from './constants';

class ToolList {
  public activeTool = new ActiveTool();

  public container = document.createElement('div');

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
    const tool = document.querySelector(`.tool_${TOOLS.PEN}`);

    this.activeTool.set(tool as HTMLDivElement);
  }

  private onSelect: EventListener = async ({ target }: Event): Promise<void> => {
    if (target === null || !isHTMLElement(target)) {
      return;
    }

    const tool = target.closest('.tool');

    if (tool === null || !isHTMLElement(tool)) {
      return;
    }

    this.activeTool.set(tool);
  };

  private renderToolContainers(): void {
    const createToolContainer = (name: string): HTMLDivElement => {
      const toolContainer = document.createElement('div');

      toolContainer.classList.add('tool', `tool_${name}`);
      toolContainer.dataset.name = `${name}`;

      return toolContainer;
    };

    this.container.append(...Object.values(TOOLS).map(createToolContainer));
  }

  private setContainerAttributes(): void {
    this.container.classList.add('container', 'container_tool-list');
  }
}

export default new ToolList();
