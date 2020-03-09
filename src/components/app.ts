import './app.css';

import FrameList from './frameList/FrameList';

const main = document.querySelector('main') as HTMLElement;

const frameList = new FrameList();

main.append(frameList.container);

frameList.initialize();
