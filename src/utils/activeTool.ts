// entities
import emitter from './emitter';
import pen from '../components/toolList/tools/pen/pen';

// constants
import { EVENTS } from '../components/constants';

// interfaces
import { Cell, Coordinates, MoveCoordinates, Tool } from '../components/interfaces';

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

  public onMouseMove(actionCoordinates: MoveCoordinates, gridSideLength: number): Coordinates[] {
    return this.activeTool.onMouseMove(actionCoordinates, gridSideLength);
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
