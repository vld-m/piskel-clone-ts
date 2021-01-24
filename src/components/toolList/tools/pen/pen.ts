/* eslint-disable class-methods-use-this */
// entites
import { line } from '../../../../utils';

// constants
import { TOOLS } from '../../constants';

// types
import { Cell, Coordinates, MoveCoordinates, Tool } from '../../../types';

class Pen implements Tool {
  public readonly name = TOOLS.PEN;

  public onMouseDown(cell: Cell, color: string): { cell?: Cell; isModified: boolean } {
    if (cell.color === color) {
      return { isModified: false };
    }

    cell.color = color;

    return { isModified: true, cell };
  }

  public onMouseMove(coordinates: MoveCoordinates, gridSideLength: number): Coordinates[] {
    return line.plot(coordinates, gridSideLength);
  }
}

export const pen = new Pen();
