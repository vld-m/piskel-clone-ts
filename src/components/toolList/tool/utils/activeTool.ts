import '../tool.css';

// entities
import emitter from '../../../../utils/emitter';
import pen from '../pen/pen';

// constants
import { EVENTS } from '../../../constants';

// interfaces
import { Cell, Coordinates, MoveCoordinates, Tool } from '../../../interfaces';

const CURRENT_COLOR = '#ff6347';

class ActiveTool {
  private activeTool: Tool = pen;

  private cache: { [name: string]: Tool } = {};

  constructor() {
    emitter.on(EVENTS.TOOL_CHANGE, this.setActiveTool);
  }

  public onMouseDown(cell: Cell): { isModified: boolean; cell?: Cell } {
    return this.activeTool.onMouseDown(cell, CURRENT_COLOR);
  }

  public onMouseMove(actionCoordinates: MoveCoordinates, gridSize: number): Coordinates[] {
    return this.activeTool.onMouseMove(actionCoordinates, gridSize);
  }

  private setActiveTool = async (name: string): Promise<void> => {
    if (this.cache[name]) {
      this.activeTool = this.cache[name];
    } else {
      const { default: tool }: { default: Tool } = await import(
        /* webpackChunkName: "[request]" */ `./${name}/${name}.ts`
      );

      this.cache[tool.name] = tool;
      this.activeTool = tool;
    }
  };
}

export default new ActiveTool();
