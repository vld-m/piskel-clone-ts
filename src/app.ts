import './app.css';

import ToolList from './components/toolList/toolList';

const main = document.querySelector('main') as HTMLElement;

main.append(ToolList.container);

ToolList.initialize();
