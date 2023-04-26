import Frameset from './frameset';

export default class Document {
  public width: number;
  public height: number;
  public frames: Frameset;

  constructor(width: number, height: number, frameCols?: number, frameRows?: number) {
    this.width = width;
    this.height = height;
    this.frames = new Frameset(frameCols || 1, frameRows || 1, width, height);
  }
}
