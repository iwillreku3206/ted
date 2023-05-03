import { BSON } from 'bson';
import Frameset from './frameset';

export type DocumentFile = {
  uuid: string;
  width: number;
  height: number;
  frames: Uint8Array[][];
}

export default class Document {
  public uuid: string;
  public width: number;
  public height: number;
  public frames: Frameset;

  constructor(width: number, height: number, frameCols?: number, frameRows?: number) {
    this.uuid = crypto.randomUUID();
    this.width = width;
    this.height = height;
    this.frames = new Frameset(frameCols || 1, frameRows || 1, width, height);
  }

  public toBSON() {
    return BSON.serialize({
      uuid: this.uuid,
      width: this.width,
      height: this.height,
      frames: this.frames.toSmallArray()
    })
  }
}
