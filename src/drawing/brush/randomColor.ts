import Brush from './brush';

const RandomColorBrush = new Brush({
  name: 'Pixel Brush',
  fn: (frame, _, x, y) => {
    frame.data[4 * (y * frame.width + x)] = Math.floor(Math.random() * 255);
    frame.data[4 * (y * frame.width + x) + 1] = Math.floor(Math.random() * 255);
    frame.data[4 * (y * frame.width + x) + 2] = Math.floor(Math.random() * 255);
    frame.data[4 * (y * frame.width + x) + 3] = 255;
    return frame;
  },
  args: new Map(),
});

export default RandomColorBrush
