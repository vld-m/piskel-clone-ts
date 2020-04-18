import './app.css';

import ToolList from './toolList/ToolList';

const main = document.querySelector('main') as HTMLElement;

main.append(ToolList.container);

ToolList.initialize();
