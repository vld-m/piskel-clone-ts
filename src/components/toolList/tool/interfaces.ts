// interfaces
import { Cell } from '../../interfaces';

interface Tool {
  name: string;
  treat(context: CanvasRenderingContext2D, cell: Cell): void;
}

export { Tool };
