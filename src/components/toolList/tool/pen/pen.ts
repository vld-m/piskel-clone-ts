/* eslint-disable class-methods-use-this */
// entites
import line from '../utils/line';

// constants
import { TOOLS } from '../../constants';

// interfaces
import { Cell, Coordinates, MoveCoordinates, Tool } from '../../../interfaces';

class Pen implements Tool {
  public readonly name = TOOLS.PEN;

  public onMouseDown(cell: Cell, color: string): { isModified: boolean; cell?: Cell } {
    if (cell.color === color) {
      return { isModified: false };
    }

    cell.color = color;

    return { isModified: true, cell };
  }

  public onMouseMove(coordinates: MoveCoordinates): Coordinates[] {
    return line.plot(coordinates);
  }
}

export default new Pen();
