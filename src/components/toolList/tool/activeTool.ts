import './tool.css';

// entities
import Emitter from '../../../utils/emitter';

// constants
import { EVENTS } from '../../constants';

// interfaces
import { Cell } from '../../interfaces';
import { Tool } from './interfaces';

class ActiveTool {
  private cache: { [name: string]: Tool } = {};

  private tool: Tool | null = null;

  constructor() {
    Emitter.on(EVENTS.TOOL_CHANGE, this.set);
  }

  public treat(context: CanvasRenderingContext2D, cell: Cell): void {
    if (this.tool) {
      this.tool.treat(context, cell);
    }
  }

  private set = async (name: string): Promise<void> => {
    if (this.cache[name]) {
      this.tool = this.cache[name];
    } else {
      const { default: tool }: { default: Tool } = await import(
        /* webpackChunkName: "[request]" */ `./${name}/${name}.ts`
      );

      this.cache[tool.name] = tool;
      this.tool = tool;
    }
  };
}

export default ActiveTool;
