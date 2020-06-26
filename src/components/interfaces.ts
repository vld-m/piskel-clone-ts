interface Cell {
  color: string;
  topLeftX: number;
  topLeftY: number;
}

interface Coordinates {
  x: number;
  y: number;
}

interface DrawingCanvasListeners {
  onMouseDown: EventListener;
  onMouseLeave: EventListener;
  onMouseMove: EventListener;
  onMouseUp: EventListener;
}

interface MoveCoordinates {
  start: Coordinates;
  end: Coordinates;
}

interface Tool {
  name: string;
  onMouseDown(cell: Cell, color: string): { isModified: boolean; cell?: Cell };
  onMouseMove(coordinates: MoveCoordinates, gridSideLength: number): Coordinates[];
}

export { Cell, Coordinates, DrawingCanvasListeners, MoveCoordinates, Tool };
