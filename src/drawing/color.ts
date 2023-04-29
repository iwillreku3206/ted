import { RgbToHsl } from '../util/colorConversion';
import { HslToRgbFn } from '../util/colorConversion';

export default class Color {
  private _r: number;
  private _g: number;
  private _b: number;
  private _h: number;
  private _s: number;
  private _l: number;

  public set r(value: number) {
    this._r = value;
    const hsl = RgbToHsl(this._r, this._g, this._b);
    this._h = Math.round(hsl.h);
    this._s = Math.round(hsl.s);
    this._l = Math.round(hsl.l);
  }
  public get r() {
    return this._r;
  }

  public set g(value: number) {
    this._g = value;
    const hsl = RgbToHsl(this._r, this._g, this._b);
    this._h = Math.round(hsl.h);
    this._s = Math.round(hsl.s);
    this._l = Math.round(hsl.l);
  }
  public get g() {
    return this._g;
  }

  public set b(value: number) {
    this._b = value;
    const hsl = RgbToHsl(this._r, this._g, this._b);
    this._h = Math.round(hsl.h);
    this._s = Math.round(hsl.s);
    this._l = Math.round(hsl.l);
  }
  public get b() {
    return this._b;
  }

  public set h(value: number) {
    this._h = value;
    this._r = Math.round(255 * HslToRgbFn(0, this._h, this._s, this._l));
    this._g = Math.round(255 * HslToRgbFn(8, this._h, this._s, this._l));
    this._b = Math.round(255 * HslToRgbFn(4, this._h, this._s, this._l));
  }
  public get h() {
    return this._h;
  }

  public set s(value: number) {
    this._s = value;
    this._r = Math.round(255 * HslToRgbFn(0, this._h, this._s, this._l));
    this._g = Math.round(255 * HslToRgbFn(8, this._h, this._s, this._l));
    this._b = Math.round(255 * HslToRgbFn(4, this._h, this._s, this._l));
  }
  public get s() {
    return this._s;
  }

  public set l(value: number) {
    this._l = value;
    this._r = Math.round(255 * HslToRgbFn(0, this._h, this._s, this._l));
    this._g = Math.round(255 * HslToRgbFn(8, this._h, this._s, this._l));
    this._b = Math.round(255 * HslToRgbFn(4, this._h, this._s, this._l));
  }
  public get l() {
    return this._l;
  }

  public a: number;

  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;

    this._r = r;
    this._g = g;
    this._b = b;

    const hsl = RgbToHsl(r, g, b);
    this.h = hsl.h;
    this.s = hsl.s;
    this.l = hsl.l;

    this._h = hsl.h;
    this._s = hsl.s;
    this._l = hsl.l;
  }

  public static fromHex(hex: string): Color {
    if (hex.length === 7) {
      return new Color(
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
        255
      );
    } else if (hex.length === 9) {
      return new Color(
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
        parseInt(hex.slice(7, 9), 16)
      );
    } else {
      throw new Error(`Invalid hex color: ${hex}`);
    }
  }

  public static fromRGB(r: number, g: number, b: number): Color {
    return new Color(r, g, b, 255);
  }

  public static fromRGBA(r: number, g: number, b: number, a: number): Color {
    return new Color(r, g, b, a);
  }

  public static fromHSL(h: number, s: number, l: number): Color {
    return new Color(HslToRgbFn(0, h, s, l), HslToRgbFn(8, h, s, l), HslToRgbFn(4, h, s, l), 255);
  }
  public static fromHSLA(h: number, s: number, l: number, a: number): Color {
    return new Color(HslToRgbFn(0, h, s, l), HslToRgbFn(8, h, s, l), HslToRgbFn(4, h, s, l), a);
  }

  public static fromUint8Array(arr: Uint8Array): Color[] {
    const colors: Color[] = [];
    for (let i = 0; i < arr.length; i += 4) {
      colors.push(new Color(arr[i], arr[i + 1], arr[i + 2], arr[i + 3]));
    }
    return colors;
  }

  public toRGBAHex() {
    return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b
      .toString(16)
      .padStart(2, '0')}${this.a.toString(16).padStart(2, '0')}`;
  }

  public toRGBHex() {
    return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b
      .toString(16)
      .padStart(2, '0')}`;
  }

  public toHSL() {
    return { h: this.h, s: this.s, l: this.l };
  }

  public toHSLA() {
    return { h: this.h, s: this.s, l: this.l, a: this.a };
  }
}
