import './tool/tool.css';

// interfaces
import { Tool } from './interfaces';

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
  }
}

export default ActiveTool;
