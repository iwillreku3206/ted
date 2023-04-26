// Converts HSL to RGB values
// See: https://en.wikipedia.org/wiki/HSL_and_HSV#Color_conversion_formulae

export function HslToRgbFn(n: number, h: number, s: number, l: number) {
  s = s / 100
  l = l / 100
  const k = (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))

  return f
}

export function RgbToHsl(r: number, g: number, b: number) {
  r = r / 255
  g = g / 255
  b = b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}
