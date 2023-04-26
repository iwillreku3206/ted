import Frame from './frame';

export default class Frameset {
  public frames: Frame[][];
  public width: number;
  public height: number;

  constructor(width: number, height: number, imageWidth: number, imageHeight: number) {
    this.frames = Array(height).fill(Array(width).fill(new Frame(imageWidth, imageHeight)));
    this.width = width;
    this.height = height;
  }

  public getFrame(x: number, y: number): Frame {
    return this.frames[y][x];
  }

  public setFrame(x: number, y: number, frame: Frame): void {
    this.frames[y][x] = frame;
  }

  public addColumn(): void {
    this.frames.forEach((row) => {
      row.push(new Frame(this.width, this.height));
    });
    this.width += 1;
  }

  public addRow(): void {
    this.frames.push(Array(this.width).fill(new Frame(this.width, this.height)));
    this.height += 1;
  }

  public removeColumn(): void {
    this.frames.forEach((row) => {
      row.pop();
    });
    this.width -= 1;
  }

  public removeRow(): void {
    this.frames.pop();
    this.height -= 1;
  }
}
