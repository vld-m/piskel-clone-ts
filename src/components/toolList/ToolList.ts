import './toolList.css';

import Tool from './tool/Tool';

import TOOLS from './constants';

class ToolList {
  public container = document.createElement('div');

  private toolList: HTMLDivElement[] = Object.values(TOOLS).map(Tool.create);

  public initialize(): void {
    this.setContainerAttributes();
    this.renderTools();
  }

  private renderTools(): void {
    this.container.append(...this.toolList);
  }

  private setContainerAttributes(): void {
    this.container.classList.add('container', 'container_tool-list');
  }
}

export default new ToolList();
