// entities
import pen from '../components/toolList/tools/pen/pen';

// utils
import { emitter } from './emitter';

// constants
import { EVENTS } from '../components/constants';

// types
import { Cell, Coordinates, MoveCoordinates, Tool } from '../components/types';

// eslint-disable-next-line no-bitwise
const CURRENT_COLOR = `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`;

export class ActiveTool {
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
