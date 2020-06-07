// interfaces
import { Cell } from '../../interfaces';

interface Tool {
  name: string;
  onMouseDown(grid: Cell[], cell: Cell, color: string): void;
}

export { Tool };
