import './tool/tool.css';

// import EventEmitter from '../../utils/EventEmitter';

// import { EVENTS } from '../constants';

interface CanvasListeners {
  onMouseDown: EventListener;
  onMouseMove: EventListener;
  onMouseLeave: EventListener;
  onMouseUp: EventListener;
}

interface Tool {
  name: string;
  getCanvasListeners(): CanvasListeners;
}

class ActiveTool {
  private cache: { [name: string]: Tool } = {};

  private tool: Tool | null = null;

  public async set(name: string): Promise<void> {
    if (this.cache[name]) {
      this.tool = this.cache[name];
    } else {
      const { default: tool }: { default: Tool } = await import(
        /* webpackChunkName: "[request]" */ `./tool/${name}/${name}.ts`
      );

      this.cache[tool.name] = tool;
      this.tool = tool;
    }

    // EventEmitter.emit<CanvasListeners>(EVENTS.TOOL_CHANGE, this.tool.getCanvasListeners());
  }
}

export default ActiveTool;
