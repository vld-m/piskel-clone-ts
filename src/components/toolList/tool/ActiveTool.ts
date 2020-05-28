import './tool.css';

interface Tool {
  name: string;
}

class ActiveTool {
  private cache: { [name: string]: Tool } = {};

  private tool: Tool | null = null;

  public async set(name: string): Promise<void> {
    if (this.cache[name]) {
      this.tool = this.cache[name];

      return;
    }

    const { default: tool }: { default: Tool } = await import(
      /* webpackChunkName: "[request]" */ `./${name}/${name}.ts`
    );

    this.cache[tool.name] = tool;
    this.tool = tool;
  }
}

export default ActiveTool;
