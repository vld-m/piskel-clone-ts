/* eslint-disable consistent-return */
import { Coordinates, MouseActionCoordinates } from '../../../interfaces';

class Line {
  private precision = 1;

  public plot({ start, end }: MouseActionCoordinates): Coordinates[] {
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

      line.push({ x, y });
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

      line.push({ x, y });
    }

    return line;
  }
}

export default new Line();
