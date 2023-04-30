import Brush from './brush';

const PixelBrush = new Brush({
  name: 'Pixel Brush',
  fn: (frame, color, x, y) => {
    frame.data[4 * (y * frame.width + x)] = color.r;
    frame.data[4 * (y * frame.width + x) + 1] = color.g;
    frame.data[4 * (y * frame.width + x) + 2] = color.b;
    frame.data[4 * (y * frame.width + x) + 3] = color.a;
    return frame;
  },
  args: new Map(),
});

export default PixelBrush
