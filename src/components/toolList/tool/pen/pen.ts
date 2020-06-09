// entites
import line from '../utils/line';

// constants
import { TOOLS } from '../../constants';

// interfaces
import { Cell, GetCell, MouseActionCoordinates, Tool } from '../../../interfaces';

class Pen implements Tool {
  public readonly name = TOOLS.PEN;

  public onMouseDown(
    coordinates: MouseActionCoordinates,
    getCell: GetCell,
    color: string
  ): { isGridModified: boolean; cells: Cell[] } {
    const cell = getCell(coordinates.end);

    const modifiedCell = this.treat(cell, color);

    return { isGridModified: true, cells: [modifiedCell] };
  }

  public onMouseMove(
    coordinates: MouseActionCoordinates,
    getCell: GetCell,
    color: string
  ): { isGridModified: boolean; cells: Cell[] } {
    const lineCoordinates = line.plot(coordinates);

    const cells = lineCoordinates.map(getCell);
    const modifiedCells = cells.map((cell) => this.treat(cell, color));

    return { isGridModified: true, cells: modifiedCells };
  }

  // eslint-disable-next-line class-methods-use-this
  private treat(cell: Cell, color: string): Cell {
    cell.color = color;

    return cell;
  }
}

export default new Pen();
