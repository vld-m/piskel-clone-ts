import './toolList.css';

// entities
import Emitter from '../../utils/emitter';

// type guards
import { isHTMLElement } from '../typeGuards';

// constants
import { TOOLS } from './constants';
import { EVENTS } from '../constants';

class ToolList {
  public readonly container = document.createElement('div');

  private activeToolContainer: HTMLElement | null = null;

  constructor() {
    this.setContainerAttributes();
    this.addListenersToContainer();
    this.renderToolContainers();
  }

  private addListenersToContainer(): void {
    this.container.addEventListener('click', this.onSelect);
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

    Emitter.emit(EVENTS.TOOL_CHANGE, toolContainer.dataset.name as string);
  };

  private renderToolContainers(): void {
    const createToolContainer = (name: string): HTMLDivElement => {
      const toolContainer = document.createElement('div');

      import(`./tool/${name}/${name}.css`);

      toolContainer.classList.add('tool', `tool_${name}`);
      toolContainer.dataset.name = `${name}`;

      if (name === TOOLS.PEN) {
        this.selectActiveToolContainer(toolContainer);
      }

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
