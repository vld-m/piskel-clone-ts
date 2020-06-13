import './app.css';

import activeTool from './components/toolList/tool/activeTool';
import grid from './components/canvas/grid';

const main = document.querySelector('main') as HTMLElement;

let isMouseDown = false;

main.append(grid.getCanvasContainer());

function onMouseDown(event: Event): void {
  isMouseDown = true;

  const downCoordinates = grid.getCoordinates(event as MouseEvent);
  const cell = grid.getCell(downCoordinates);

  const { isModified } = activeTool.onMouseDown(cell);

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

  if (grid.isMoveInsideCell(moveCoordinates)) {
    return;
  }

  const processedCoordinates = activeTool.onMouseMove(moveCoordinates);
  const processedCells = processedCoordinates.map((coordinates) => {
    const cell = grid.getCell(coordinates);

    return activeTool.onMouseDown(cell);
  });

  if (processedCells.some(({ isModified }) => isModified)) {
    grid.repaint();
  }

  grid.setPreviousActionEndCoordinates(moveCoordinates.end);
}

function onMouseUp(): void {
  isMouseDown = false;
}

grid.addCanvasListeners({ onMouseDown, onMouseMove, onMouseUp });
