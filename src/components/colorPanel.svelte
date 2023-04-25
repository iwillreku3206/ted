<script lang="ts">
	import ColorPicker from './colorPicker.svelte';
	let hue = 0;
	let saturation = 100;
	let lightness = 50;
</script>

<div class="p-4 picker-container">
	<ColorPicker bind:hue bind:saturation {lightness} />

	<input
		type="range"
		min="0"
		max="100"
		style={`background: linear-gradient(to right, hsl(${hue.toFixed(0)}, ${saturation.toFixed(
			0
		)}%, 0%), hsl(${hue.toFixed(0)}, ${saturation.toFixed(0)}%, 100%))`}
		bind:value={lightness}
	/>

  <div class="w-16 h-16" style={`background-color: hsl(${hue}, ${saturation}%, ${lightness}%)`} /> 
</div>

<style lang="postcss">
	.picker-container {
		--picker-background: theme('colors.base-200');
	}
</style>
