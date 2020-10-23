export interface BoardListeners {
  onMouseDown: EventListener;
  onMouseLeave: EventListener;
  onMouseMove: EventListener;
  onMouseUp: EventListener;
}

export interface Cell {
  color: string;
  topLeftX: number;
  topLeftY: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface MoveCoordinates {
  start: Coordinates;
  end: Coordinates;
}

export interface Tool {
  name: string;
  onMouseDown(cell: Cell, color: string): { isModified: boolean; cell?: Cell };
  onMouseMove(coordinates: MoveCoordinates, gridSideLength: number): Coordinates[];
}
