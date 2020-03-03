import './app.css';

import FrameList from './frameList/FrameList';

const frameList = new FrameList();

const main = document.querySelector('main');

(main as HTMLElement).append(frameList.container);
