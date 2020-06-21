import './app.css';

import activeTool from './components/toolList/tool/utils/activeTool';
import grid from './components/canvas/utils/grid';

import { Cell } from './components/interfaces';

const main = document.querySelector('main') as HTMLElement;

let isMouseDown = false;

function onMouseDown(event: Event): void {
  isMouseDown = true;

  const downCoordinates = grid.getCoordinates(event as MouseEvent);
  const targetCell = grid.getCell(downCoordinates);
  const { isModified } = activeTool.onMouseDown(targetCell);

  if (isModified) {
    grid.repaint();
  }

  grid.setPreviousActionEndCoordinates(downCoordinates);
}

function onMouseMove(event: Event): void {
  if (!isMouseDown) {
    return;
  }

  const moveCoordinates = grid.getMoveCoordinates(event as MouseEvent);

  const processedCoordinates = activeTool.onMouseMove(moveCoordinates, grid.getSize());
  const processedCells = processedCoordinates.reduce<Cell[]>((cells, coordinates) => {
    const targetCell = grid.getCell(coordinates);
    const { isModified, cell } = activeTool.onMouseDown(targetCell);

    return isModified && cell ? [...cells, cell] : cells;
  }, []);

  if (processedCells.length > 0) {
    grid.repaint();
  }

  grid.setPreviousActionEndCoordinates(moveCoordinates.end);
}

function onMouseLeave(event: Event): void {
  if (!isMouseDown) {
    return;
  }

  grid.highlight();

  onMouseMove(event);

  isMouseDown = false;
}

function onMouseUp(): void {
  isMouseDown = false;
}

main.append(grid.getContainer());

grid.addCanvasListeners({ onMouseDown, onMouseLeave, onMouseMove, onMouseUp });
