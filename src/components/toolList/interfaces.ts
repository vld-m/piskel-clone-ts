// interfaces
import { CanvasListeners } from '../interfaces';

interface Tool {
  name: string;
  getCanvasListeners(): CanvasListeners;
}

export { Tool };
