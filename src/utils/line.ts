import { Coordinates, MoveCoordinates } from '../components/types';

class Line {
  private gridSideLength = 1;

  private precision = 1;

  public plot({ start, end }: MoveCoordinates, gridSideLength: number): Coordinates[] {
    this.gridSideLength = gridSideLength;

    const { x: x0, y: y0 } = start;
    const { x: x1, y: y1 } = end;

    const dx = x1 - x0;
    const dy = y1 - y0;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        // right
        return this.plotHorizontal(start, end);
      }

      // left
      return this.plotHorizontal(end, start);
    }

    if (dy > 0) {
      // down
      return this.plotVertical(start, end);
    }

    // up
    return this.plotVertical(end, start);
  }

  private isInsideGrid(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.gridSideLength && y < this.gridSideLength;
  }

  private plotHorizontal(
    { x: x0, y: y0 }: Coordinates,
    { x: x1, y: y1 }: Coordinates
  ): Coordinates[] {
    const line: Coordinates[] = [];

    const dx = x1 - x0;

    let dy = y1 - y0;
    let yi = this.precision;

    if (dy < 0) {
      yi = -yi;
      dy = -dy;
    }

    let diff = 2 * dy - dx;
    let y = y0;

    for (let x = x0; x <= x1; x += this.precision) {
      if (diff > 0) {
        y += yi;
        diff -= 2 * dx;
      }

      diff += 2 * dy;

      if (this.isInsideGrid(x, y)) {
        line.push({ x, y });
      }
    }

    return line;
  }

  private plotVertical(
    { x: x0, y: y0 }: Coordinates,
    { x: x1, y: y1 }: Coordinates
  ): Coordinates[] {
    const line: Coordinates[] = [];

    const dy = y1 - y0;

    let dx = x1 - x0;
    let xi = this.precision;

    if (dx < 0) {
      xi = -xi;
      dx = -dx;
    }

    let diff = 2 * dx - dy;
    let x = x0;

    for (let y = y0; y <= y1; y += this.precision) {
      if (diff > 0) {
        x += xi;
        diff -= 2 * dy;
      }

      diff += 2 * dx;

      if (this.isInsideGrid(x, y)) {
        line.push({ x, y });
      }
    }

    return line;
  }
}

export const line = new Line();
