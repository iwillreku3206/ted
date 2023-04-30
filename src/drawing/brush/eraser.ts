import Brush from "./brush";

const EraserBrush = new Brush({
  name: 'Eraser',
  fn: (frame, _, x, y) => {
    frame.data[4 * (y * frame.width + x)] = 0;
    frame.data[4 * (y * frame.width + x) + 1] = 0;
    frame.data[4 * (y * frame.width + x) + 2] = 0;
    frame.data[4 * (y * frame.width + x) + 3] = 0;
    return frame;
  },
  args: new Map(),
})

export default EraserBrush;
