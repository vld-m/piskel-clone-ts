import './tool.css';

// entities
import Emitter from '../../../utils/emitter';

// constants
import { EVENTS } from '../../constants';

// interfaces
import { Tool } from './interfaces';

class ActiveTool {
  public tool: Tool | null = null;

  private cache: { [name: string]: Tool } = {};

  constructor() {
    Emitter.on(EVENTS.TOOL_CHANGE, this.set);
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
