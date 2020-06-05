interface CanvasListeners {
  onContextMenu: EventListener;
  onMouseDown: EventListener;
  // onMouseMove: EventListener;
  // onMouseLeave: EventListener;
  // onMouseUp: EventListener;
}

interface Cell {
  topLeftX: number;
  topLeftY: number;
  color: string;
}
export { CanvasListeners, Cell };
