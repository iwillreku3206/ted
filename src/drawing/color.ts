import { HslToRgbFn } from "../util/colorConversion";

export default class Color {
  public r: number;
  public g: number;
  public b: number;
  public a: number;

  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
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
    return `#${this.r.toString(16).padStart(2, "0")}${this.g
      .toString(16)
      .padStart(2, "0")}${this.b.toString(16).padStart(2, "0")}${this.a
        .toString(16)
        .padStart(2, "0")}`;
  }

  public toRGBHex() {
    return `#${this.r.toString(16).padStart(2, "0")}${this.g
      .toString(16)
      .padStart(2, "0")}${this.b.toString(16).padStart(2, "0")}`;
  }

  public toHSL() {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0;
    let s = 0;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  public toHSLA() {
    const hsl = this.toHSL();
    return { h: hsl.h, s: hsl.s, l: hsl.l, a: this.a };
  }
}
