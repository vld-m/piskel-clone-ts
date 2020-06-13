interface CanvasListeners {
  onMouseDown: EventListener;
  onMouseMove: EventListener;
  // onMouseLeave: EventListener;
  onMouseUp: EventListener;
}

interface Cell {
  color: string;
  topLeftX: number;
  topLeftY: number;
}

interface Coordinates {
  x: number;
  y: number;
}

interface MoveCoordinates {
  start: Coordinates;
  end: Coordinates;
}

interface Tool {
  name: string;
  onMouseDown(cell: Cell, color: string): { isModified: boolean; cell?: Cell };
  onMouseMove(coordinates: MoveCoordinates): Coordinates[];
}

export { CanvasListeners, Cell, Coordinates, MoveCoordinates, Tool };
