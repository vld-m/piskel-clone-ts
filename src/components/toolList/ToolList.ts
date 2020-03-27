import './toolList.css';

import Tool from './tool/Tool';

class ToolList {
  public container = document.createElement('div');

  public initialize(): void {
    this.setContainerAttributes();
  }

  private setContainerAttributes(): void {
    this.container.classList.add('container', 'container_tool-list');
  }
}

export default ToolList;
