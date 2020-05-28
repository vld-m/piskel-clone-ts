import './tool.css';

interface Tool {
  name: string;
}

class ActiveTool {
  private cache: { [name: string]: Tool } = {};

  private tool: Tool | null = null;

  public set(name: string): void {
    if (this.cache[name]) {
      this.tool = this.cache[name];

      return;
    }

    import(`./${name}/${name}.ts`).then(({ default: tool }: { default: Tool }) => {
      this.cache[tool.name] = tool;
      this.tool = tool;
    });
  }
}

export default ActiveTool;
