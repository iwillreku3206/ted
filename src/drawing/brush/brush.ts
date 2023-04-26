import type Frame from '../../document/frame';
import type Color from '../color';

export interface BrushOptions {
  name: string;
  args: Map<string, BrushArgumentType>;
  fn: (frame: Uint8Array, color: Color, args: Map<string, BrushArgumentJSType>) => Uint8Array;
}

export type BrushArgumentType = 'string' | 'number' | 'boolean' | 'color' | 'image';
export type BrushArgumentJSType = string | number | boolean | Color | Uint8Array;

export default class Brush {
  public name: string;
  public args: Map<string, BrushArgumentType>;
   fn: (frame: Uint8Array, color: Color, args: Map<string, BrushArgumentJSType>) => Uint8Array;

  constructor(opts: BrushOptions) {
    this.name = opts.name;
    this.args = opts.args;
    this.fn = opts.fn;
  }

  public apply(frame: Frame, color: Color, args: Map<string, BrushArgumentJSType>): Uint8Array {
    return this.fn(frame.data, color, args);
  }
}
