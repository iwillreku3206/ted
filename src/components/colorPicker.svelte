<script lang="ts">
	import { colord } from 'colord';

	let mouseDown = false;
	let picker: HTMLDivElement;

	export let hue = 0;
	export let saturation = 100;
	export let lightness = 50;

	const setPos = (x: number, y: number) => {
		if (!picker.parentElement) return;
		const left = picker.offsetLeft;
		const top = picker.offsetTop;
		hue = Math.min(Math.max(x - left, 0), 360);
		saturation = Math.min(Math.max((y - top) / 2, 0), 100);

		console.log({ left, top, x, y, hue, saturation });
	};

	const onMouseDown = (e: MouseEvent) => {
		mouseDown = true;
		if (mouseDown) {
			setPos(e.x, e.y);
		}
	};

	const onMouseUp = () => {
		mouseDown = false;
	};

	const onMouseMove = (e: MouseEvent) => {
		if (mouseDown) {
			setPos(e.x, e.y);
		}
	};

	$: bgStyle = `
		background: linear-gradient(
				to right,
				hsl(0, 100%, ${lightness}%),
				hsl(60, 100%, ${lightness}%),
				hsl(120, 100%, ${lightness}%),
				hsl(180, 100%, ${lightness}%),
				hsl(240, 100%, ${lightness}%),
				hsl(300, 100%, ${lightness}%),
				hsl(360, 100%, ${lightness}%)
			),
			linear-gradient(to bottom, hsl(0, 0%, ${lightness}%), hsl(0, 100%, ${lightness}%));
	`;
</script>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<div
	class="color-picker"
	style={bgStyle}
	bind:this={picker}
	on:mouseup={onMouseUp}
	on:mousemove={onMouseMove}
	on:mousedown={onMouseDown}
>
	<div class="cursor" style={`left: ${hue - 7}px; top: ${2 * saturation - 7}px;`} />
</div>

<div style="--lightness:{lightness}" />

<style>
	.color-picker {
		width: 360px;
		height: 200px;

		background-blend-mode: hue;
	}

	.cursor {
		position: relative;
		border-radius: 50%;
		width: 14px;
		height: 14px;
		border: 3px solid black;
		outline: 2px solid white;
		pointer-events: none;
	}
</style>
