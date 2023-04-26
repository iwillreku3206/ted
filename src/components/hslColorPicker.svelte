<script lang="ts">
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
		saturation = Math.abs(100 - Math.min(Math.max((y - top) / 2, 0), 100));

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

	$: hslBg1Style = `
		background: linear-gradient(
				to right,
				hsl(0, 100%, ${lightness}%),
				hsl(60, 100%, ${lightness}%),
				hsl(120, 100%, ${lightness}%),
				hsl(180, 100%, ${lightness}%),
				hsl(240, 100%, ${lightness}%),
				hsl(300, 100%, ${lightness}%),
				hsl(360, 100%, ${lightness}%)
			)
	`;

	$: hslBg2Style = `
    background: linear-gradient(
        to bottom,
        hsla(0, 0%, ${lightness}%, 0),
        hsla(0, 0%, ${lightness}%, 1)
      )
  `;
</script>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<div>
	<div
		class="color-picker-hsl"
		style={hslBg1Style}
		bind:this={picker}
		on:mouseup={onMouseUp}
		on:mousemove={onMouseMove}
		on:mousedown={onMouseDown}
	>
		<div style={hslBg1Style} class="color-picker-hsl-bg" />
		<div style={hslBg2Style} class="color-picker-hsl-bg" />
		<div
			class="cursor"
			style={`left: ${hue - 7}px; top: ${2 * Math.abs(100 - saturation) - 7}px;`}
		/>
	</div>
</div>
<input
	type="range"
	min="0"
	max="100"
	class="slider w-full h-2"
	style={`background: linear-gradient(to right, hsl(${hue.toFixed(0)}, ${saturation.toFixed(
		0
	)}%, 0%), hsl(${hue.toFixed(0)}, ${saturation.toFixed(0)}%, 50%), hsl(${hue.toFixed(
		0
	)}, ${saturation.toFixed(0)}%, 100%))`}
	bind:value={lightness}
/>

<div style="--lightness:{lightness}" />

<style>
	.color-picker-hsl {
		width: 360px;
		height: 200px;

		background-blend-mode: hue;
	}

	.color-picker-hsl-bg {
		position: absolute;
		width: 360px;
		height: 200px;
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
	.slider {
		appearance: none;
		-webkit-appearance: none;
	}
</style>
