export interface FrameListeners {
  onCopy: (event: MouseEvent) => void;
  onDelete: (event: MouseEvent) => void;
  onDragEnter: (event: DragEvent) => void;
  onDragStart: (event: DragEvent) => void;
  onSelect: (event: MouseEvent) => void;
}
