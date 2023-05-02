import Color from '../drawing/color';
import Queue from '../util/queue';

export default class Frame {
  public data: Uint8Array;
  public undoStates: Queue<Uint8Array>;
  public redoStates: Queue<Uint8Array>;
  public width: number;
  public height: number;

  constructor(width: number, height: number) {
    this.data = new Uint8Array(width * height * 4);
    this.undoStates = new Queue<Uint8Array>();
    this.redoStates = new Queue<Uint8Array>();
    this.width = width;
    this.height = height;
  }

  public asColorArray(): Color[] {
    return Color.fromUint8Array(this.data);
  }
}
