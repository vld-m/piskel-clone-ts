// utils
import { emitter } from '../../utils';

// type guards
import { isHTMLElement } from '../typeGuards';

// constants
import { TOOLS } from './constants';
import { EVENTS } from '../constants';

export class ToolList {
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

  private onSelect = ({ target }: MouseEvent) => {
    if (target === null || !isHTMLElement(target)) {
      return;
    }

    const toolContainer = target.closest('.tool');

    if (toolContainer === null || !isHTMLElement(toolContainer)) {
      return;
    }

    this.selectActiveToolContainer(toolContainer);

    emitter.emit(EVENTS.TOOL_CHANGE, toolContainer.dataset.name as string);
  };

  private renderToolContainers(): void {
    const createToolContainer = (name: string): HTMLDivElement => {
      const toolContainer = document.createElement('div');

      import(`./tools/${name}/${name}.css`).catch(console.error);

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
    this.container.classList.add('container', 'tool-list__container');
  }
}
