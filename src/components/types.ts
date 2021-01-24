export interface BoardListeners {
  onMouseDown: (event: MouseEvent) => void;
  onMouseLeave: (event: MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
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
  end: Coordinates;
  start: Coordinates;
}

export interface Tool {
  name: string;
  onMouseDown(cell: Cell, color: string): { cell?: Cell; isModified: boolean };
  onMouseMove(coordinates: MoveCoordinates, gridSideLength: number): Coordinates[];
}
