interface CanvasListeners {
  onMouseDown: EventListener;
  // onMouseMove: EventListener;
  // onMouseLeave: EventListener;
  // onMouseUp: EventListener;
}

interface Cell {
  color: string;
  topLeftX: number;
  topLeftY: number;
}
export { CanvasListeners, Cell };
