const PIXELS_ON_SIDE = 12;

interface Pixel {
  topLeftX: number;
  topLeftY: number;
  color: string;
}

class Grid {
  private grid: Pixel[] = [];

  private pixelSize: number;

  constructor(private canvas: HTMLCanvasElement) {
    this.pixelSize = canvas.clientHeight / PIXELS_ON_SIDE;

    this.createGrid();
  }

  public getPixel({ clientX, clientY }: MouseEvent): Pixel | undefined {
    const x = clientX - this.canvas.offsetLeft;
    const y = clientY - this.canvas.offsetTop;

    return this.grid.find(
      ({ topLeftX, topLeftY }) => x < topLeftX + this.pixelSize && y < topLeftY + this.pixelSize
    );
  }

  private createGrid(): void {
    for (let row = 0; row < PIXELS_ON_SIDE; row += 1) {
      for (let column = 0; column < PIXELS_ON_SIDE; column += 1) {
        const pixel: Pixel = {
          topLeftX: column * this.pixelSize,
          topLeftY: row * this.pixelSize,
          color: 'transparent',
        };

        this.grid = [...this.grid, pixel];
      }
    }
  }
}

export default Grid;
