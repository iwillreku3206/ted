<script lang="ts">
	import { onMount } from 'svelte';
	import type Document from '../document/document';
	import { browser } from '$app/environment';

	export let defaultFrameX = 0;
	export let defaultFrameY = 0;

	export let workingDocument: Document;

	let min_scale = Math.round(48 / Math.max(workingDocument.width, workingDocument.height));

	export let scale = min_scale;

	let x = defaultFrameX;
	let y = defaultFrameY;

	export let currentFrame;

	$: currentFrame = { x, y };

	$: workingDocument && updateImageData();

	let imageData: string[] = [];

	function updateImageData() {
		if (!browser) return;
		workingDocument.frames.frames.forEach((row, y) => {
			row.forEach((_, x) => {
				const canvas = new OffscreenCanvas(workingDocument.width, workingDocument.height);
				const ctx = canvas.getContext('2d');
				if (!ctx) return;
				const data = ctx.createImageData(workingDocument.width, workingDocument.height);

				workingDocument.frames.frames[y][x].data.forEach((byte, i) => {
					data.data[i] = byte;
				});
				ctx.putImageData(data, 0, 0);

				canvas.convertToBlob().then((blob) => {
					const url = URL.createObjectURL(blob);
					imageData[y * workingDocument.frames.width + x] = url.toString();
				});
			});
		});

		imageData = imageData;

		return true;
	}

	function setXY(_x: number, _y: number) {
		x = _x;
		y = _y;
	}

	onMount(() => {
		updateImageData();
	});
</script>

<div class="h-full flex flex-col">
	<div class="flex-grow-0 flex-shrink basis-auto">
		<button on:click={updateImageData}>Update</button>
		<input type="range" bind:value={scale} min={min_scale} max="20" step="0.01" />

		<button on:click={() => console.log(imageData)}>test</button>
	</div>
  <div class="flex-auto overflow-scroll">
	<div class="flex flex-col gap-2">
		{#each { length: workingDocument.frames.height } as _, imageY}
			<div class="flex flex-row gap-2">
				{#each { length: workingDocument.frames.width } as _, imageX}
					<div>
						<img
							width={workingDocument.width * scale}
							height={workingDocument.height * scale}
							alt=""
							class={`preview-image ${
								x === imageX && y === imageY ? 'border-2 border-primary' : 'border-0'
							} ${x} ${y}`}
							on:click={() => setXY(imageX, imageY)}
							on:keydown={() => setXY(imageX, imageY)}
							src={imageData[imageY * workingDocument.frames.width + imageX]}
						/>
					</div>
				{/each}
			</div>
		{/each}
	</div>
  </div>
</div>

<style>
	.preview-image {
		image-rendering: pixelated;
		background: url('/assets/checkerboard.svg');
	}
</style>
