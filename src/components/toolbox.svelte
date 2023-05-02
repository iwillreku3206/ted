<script lang="ts">
	import type Brush from '../drawing/brush/brush';
	import EraserBrush from '../drawing/brush/eraser';
	import PixelBrush from '../drawing/brush/pixel';
	import RandomColorBrush from '../drawing/brush/randomColor';
	import type Tool from '../drawing/tool/tool';
	import { currentToolStore } from '../stores/toolStore';

	function selectTool(tool: Tool) {
		return () => currentToolStore.set({ type: 'tool', tool });
	}
	function selectBrush(brush: Brush) {
		return () => currentToolStore.set({ type: 'brush', brush });
	}
</script>

<div class="p-4">
	Tools
	<hr />
	Brushes
  <button on:click={selectBrush(PixelBrush)}>Pixel</button>
  <button on:click={selectBrush(EraserBrush)}>Eraser</button>
  <button on:click={selectBrush(RandomColorBrush)}>Random</button>
</div>
