import './app.css';

import { ActiveTool } from './utils';
import { Board } from './components/board';
import { FrameList } from './components/frameList';

import { Cell } from './components/types';

const main = document.querySelector('main');
const activeTool = new ActiveTool();
const frameList = new FrameList();
const board = new Board();

let isMouseDown = false;
let actionEndCoordinates = { x: 0, y: 0 };

function onMouseDown(event: MouseEvent): void {
  isMouseDown = true;

  const boardCoordinates = board.getCoordinates(event);

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

function onMouseMove(event: MouseEvent): void {
  if (!isMouseDown) {
    return;
  }

  const moveCoordinates = {
    start: actionEndCoordinates,
    end: board.getCoordinates(event),
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

function onMouseLeave(event: MouseEvent): void {
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

board.subscribe({ onMouseDown, onMouseLeave, onMouseMove, onMouseUp });

if (main) {
  main.append(frameList.container, board.container);
}
