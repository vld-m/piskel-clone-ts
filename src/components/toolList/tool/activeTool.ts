import './tool.css';

// entities
import Emitter from '../../../utils/emitter';

// constants
import { EVENTS } from '../../constants';

// interfaces
import { GetCell, MouseActionCoordinates, Tool } from '../../interfaces';

const CURRENT_COLOR = '#bdb76b';

class ActiveTool {
  private cache: { [name: string]: Tool } = {};

  private tool: Tool | null = null;

  constructor() {
    Emitter.on(EVENTS.TOOL_CHANGE, this.set);
    Emitter.emit(EVENTS.TOOL_CHANGE, 'pen');
  }

  public onMouseDown(coordinates: MouseActionCoordinates, getCell: GetCell): void {
    if (this.tool === null) {
      return;
    }

    this.tool.onMouseDown(coordinates, getCell, CURRENT_COLOR);
  }

  public onMouseMove(coordinates: MouseActionCoordinates, getCell: GetCell): void {
    if (this.tool === null) {
      return;
    }

    this.tool.onMouseMove(coordinates, getCell, CURRENT_COLOR);
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
