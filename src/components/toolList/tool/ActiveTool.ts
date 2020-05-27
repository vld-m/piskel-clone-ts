import './tool.css';

interface Tool {
  name: string;
}

class ActiveTool {
  private cache: { [name: string]: Tool } = {};

  private container: HTMLElement | null = null;

  private tool: Tool | null = null;

  public set(container: HTMLElement): void {
    this.setContainer(container);
    this.setTool(container);
  }

  private async getTool(name: string): Promise<Tool> {
    if (this.cache[name]) {
      return this.cache[name];
    }

    const { default: tool }: { default: Tool } = await import(`./${name}/${name}.ts`);

    this.cache[tool.name] = tool;

    return tool;
  }

  private setContainer(container: HTMLElement): void {
    if (this.container) {
      this.container.classList.remove('tool_active');
    }

    this.container = container;

    this.container.classList.add('tool_active');
  }

  private async setTool({ dataset: { name } }: HTMLElement): Promise<void> {
    this.tool = await this.getTool(name as string);
  }
}

export default ActiveTool;
