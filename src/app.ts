import './app.css';

import Grid from './components/canvas/grid';

const grid = new Grid();

const main = document.querySelector('main') as HTMLElement;

main.append(grid.container);
