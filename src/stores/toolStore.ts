import { writable } from 'svelte/store';
import type Tool from '../drawing/tool/tool';
import type Brush from '../drawing/brush/brush';
import PixelBrush from '../drawing/brush/pixel';

export type SelectedTool =
	| {
			type: 'tool';
			tool: Tool;
	  }
	| {
			type: 'brush';
			brush: Brush;
	  };

export const currentToolStore = writable<SelectedTool>({
	type: 'brush',
	brush: PixelBrush
});
