<script lang="ts">
	import { colord } from 'colord';
	import { onMount } from 'svelte';

	let pickerPalette: HTMLDivElement;

	let hue = 0;
	let saturation = 100;
	let lightness = 50;

	let cursorX = 0;
	let cursorY = 0;

	let mouseDown = false;
	let parentX = 0;
	let parentY = 0;

	onMount(() => {
		const parent = pickerPalette?.parentElement;
		parentX = parent?.offsetLeft || 0;
		parentY = parent?.offsetTop || 0;
	});
	function getComputedXY() {
		return {
			x: saturation * 1.8 * Math.cos((hue * Math.PI) / 180) + 180,
			y: -180 - saturation * 1.8 * Math.sin((hue * Math.PI) / 180)
		};
	}

	function recalculateHS(e: MouseEvent) {
		// radius/center-relative coordinates
		const rx = e.offsetX - 180;
		const ry = 180 - e.offsetY;

		hue =
			ry > 0
				? (Math.atan2(ry, rx) * 180) / Math.PI
				: ((Math.atan2(ry, rx) + Math.PI * 2) * 180) / Math.PI;
		saturation = Math.min(Math.max(Math.sqrt(rx * rx + ry * ry) / 1.8, 0), 100);
		console.log({ rx, ry, hue, saturation });
	}

	function recomputeXY() {
		let coords = getComputedXY();

		cursorX = coords.x;
		cursorY = coords.y;
	}

	function onMouseDown(e: MouseEvent) {
		mouseDown = true;
		recalculateHS(e);
		recomputeXY();
	}

	function onMouseMove(e: MouseEvent) {
		if (mouseDown) {
			recalculateHS(e);
			recomputeXY();
		}
	}
	function onMouseUp() {
		mouseDown = false;
	}
</script>

<div class="color-picker-bg">
	<div
		class="color-picker"
		bind:this={pickerPalette}
		on:mouseup={onMouseUp}
		on:mousemove={onMouseMove}
		on:mousedown={onMouseDown}
	>
		<div class="relative top-0 left-0" style="font-size: 1000px; font-weight: 100;">
			<svg width="360" height="360">
				<line x1="0" y1="180" x2="360" y2="180" stroke="black" stroke-width="2" />
				<line x1="180" y1="0" x2="180" y2="360" stroke="black" stroke-width="2" />
			</svg>
		</div>
		<div class="cursor" style={`left: ${cursorX - 7}px; top: ${cursorY -7}px;`} />
	</div>
</div>

<style>
	.color-picker {
		width: 360px;
		height: 360px;
		border-radius: 50%;
		transform: rotate(-90deg);
	}

	.color-picker-bg {
		width: 360px;
		height: 360px;
		border-radius: 50%;
		background: conic-gradient(
				hsl(0, 100%, 50%),
				hsl(60, 100%, 50%),
				hsl(120, 100%, 50%),
				hsl(180, 100%, 50%),
				hsl(240, 100%, 50%),
				hsl(300, 100%, 50%),
				hsl(360, 100%, 50%)
			),
			radial-gradient(hsl(0, 0%, 50%), hsl(0, 100%, 50%));
		background-blend-mode: hue;
		transform: rotate(90deg);
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
