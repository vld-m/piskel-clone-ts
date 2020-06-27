import './app.css';

import activeTool from './utils/activeTool';
import board from './components/board/board';
import frameList from './components/frameList/frameList';

import { Cell } from './components/interfaces';

const main = document.querySelector('main') as HTMLElement;

let isMouseDown = false;
let actionEndCoordinates = { x: 0, y: 0 };

function onMouseDown(event: Event): void {
  isMouseDown = true;

  const boardCoordinates = board.getCoordinates(event as MouseEvent);

  const targetCell = board.getCell(boardCoordinates);

  const { isModified } = activeTool.onMouseDown(targetCell);

  const { currentFrame } = frameList;

  if (isModified && currentFrame) {
    board.repaint();

    currentFrame.mapColors(board.grid);
    currentFrame.repaint();
  }

  actionEndCoordinates = boardCoordinates;
}

function onMouseMove(event: Event): void {
  if (!isMouseDown) {
    return;
  }

  const moveCoordinates = {
    start: actionEndCoordinates,
    end: board.getCoordinates(event as MouseEvent),
  };

  const processedCoordinates = activeTool.onMouseMove(moveCoordinates, board.getSideLength());

  const processedCells = processedCoordinates.reduce<Cell[]>((cells, coordinates) => {
    const targetCell = board.getCell(coordinates);
    const { isModified, cell } = activeTool.onMouseDown(targetCell);

    return isModified && cell ? [...cells, cell] : cells;
  }, []);

  const { currentFrame } = frameList;

  if (processedCells.length > 0 && currentFrame) {
    board.repaint();

    currentFrame.mapColors(board.grid);
    currentFrame.repaint();
  }

  actionEndCoordinates = moveCoordinates.end;
}

function onMouseLeave(event: Event): void {
  if (!isMouseDown) {
    return;
  }

  onMouseMove(event);

  isMouseDown = false;

  board.highlight();
}

function onMouseUp(): void {
  isMouseDown = false;
}

main.append(frameList.container, board.container);

board.subscribe({ onMouseDown, onMouseLeave, onMouseMove, onMouseUp });
