<script lang="ts">
	import { onMount } from 'svelte';
	import type Document from '../document/document';
	import { browser } from '$app/environment';
	import { currentDocumentStore } from '../stores/documentStore';
	import { currentFrameStore } from '../stores/currentFrameStore';

	let currentDocument = $currentDocumentStore;
	let currentFrame = $currentFrameStore;

	$: min_scale = Math.round(48 / Math.max(currentDocument.width, currentDocument.height));

	export let scale = min_scale;

	$: currentDocument && updateImageData();

	let imageData: string[] = [];

	function updateImageData() {
		if (!browser) return;
		currentDocument.frames.frames.forEach((row, y) => {
			row.forEach((_, x) => {
				const canvas = new OffscreenCanvas(currentDocument.width, currentDocument.height);
				const ctx = canvas.getContext('2d');
				if (!ctx) return;
				const data = ctx.createImageData(currentDocument.width, currentDocument.height);

				currentDocument.frames.frames[y][x].data.forEach((byte, i) => {
					data.data[i] = byte;
				});
				ctx.putImageData(data, 0, 0);

				canvas.convertToBlob().then((blob) => {
					const url = URL.createObjectURL(blob);
					imageData[y * currentDocument.frames.width + x] = url.toString();
				});
			});
		});

		imageData = imageData;

		return true;
	}

	function setXY(_x: number, _y: number) {
		currentFrameStore.set({ x: _x, y: _y });
	}

	onMount(() => {
		updateImageData();
	});
</script>

<div class="h-full flex flex-col flex-grow-0 flex-shrink">
	<div class="flex-grow-0 flex-shrink basis-auto">
		<button on:click={updateImageData}>Update</button>
		<input type="range" bind:value={scale} min={min_scale} max={min_scale * 2} step="0.01" />

		<button on:click={() => console.log(imageData)}>test</button>
	</div>
	<div class="flex-auto overflow-scroll">
		<div class="flex flex-col gap-2 p-4 pb-8">
			{#each { length: currentDocument.frames.height } as _, imageY}
				<div class="flex flex-row gap-2">
					{#each { length: currentDocument.frames.width } as _, imageX}
						<div>
							<img
								width={currentDocument.width * scale}
								height={currentDocument.height * scale}
								alt=""
								class={`preview-image ${
									currentFrame.x === imageX && currentFrame.y === imageY
										? 'border-2 border-primary'
										: 'border-0'
								}`}
								on:click={() => setXY(imageX, imageY)}
								on:keydown={() => setXY(imageX, imageY)}
								src={imageData[imageY * currentDocument.frames.width + imageX]}
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
