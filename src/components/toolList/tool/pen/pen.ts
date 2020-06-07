/* eslint-disable class-methods-use-this */
// constants
import { TOOLS } from '../../constants';

// interfaces
import { Cell } from '../../../interfaces';
import { Tool } from '../interfaces';

class Pen implements Tool {
  public readonly name = TOOLS.PEN;

  public onMouseDown(grid: Cell[], cell: Cell, color: string): void {
    cell.color = color;
  }
}

export default new Pen();
