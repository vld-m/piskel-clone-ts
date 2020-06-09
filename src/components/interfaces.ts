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

interface GetCell {
  (coordinates: Coordinates): Cell;
}

interface MouseActionCoordinates {
  start: Coordinates;
  end: Coordinates;
}

interface Tool {
  name: string;
  onMouseDown(coordinates: MouseActionCoordinates, getCell: GetCell, color: string): void;
  onMouseMove(coordinates: MouseActionCoordinates, getCell: GetCell, color: string): void;
}

export { CanvasListeners, Cell, Coordinates, GetCell, MouseActionCoordinates, Tool };
