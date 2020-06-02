import './app.css';

import canvas from './components/canvas/canvas';

const main = document.querySelector('main') as HTMLElement;

main.append(canvas.container);
