import './app.css';

import ToolList from './toolList/ToolList';

const main = document.querySelector('main') as HTMLElement;

const toolList = new ToolList();

main.append(toolList.container);

toolList.initialize();
