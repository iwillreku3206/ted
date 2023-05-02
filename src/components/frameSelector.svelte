<script lang="ts">
	import { onMount } from 'svelte';
	import type Document from '../document/document';
	import { browser } from '$app/environment';
	import { currentDocumentStore } from '../stores/documentStore';
	import { currentFrameStore } from '../stores/currentFrameStore';

	$: min_scale = Math.round(
		48 / Math.max($currentDocumentStore.width, $currentDocumentStore.height)
	);

	export let scale = min_scale;
	$: scale = Math.max(scale, min_scale);

	$: $currentDocumentStore && updateImageData();

	let imageData: string[] = [];

	function updateImageData() {
		if (!browser) return;
		import('@silvia-odwyer/photon').then((photon) => {
			const image = new photon.PhotonImage(
				$currentDocumentStore.frames.frames[$currentFrameStore.y][$currentFrameStore.x].data,
				$currentDocumentStore.width,
				$currentDocumentStore.height
			);
			imageData[$currentFrameStore.y * $currentDocumentStore.frames.width + $currentFrameStore.x] = image.get_base64();
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
		<div class="flex flex-col p-4 pb-12">
			{#each { length: $currentDocumentStore.frames.height } as _, imageY}
				<div class="flex flex-row">
					{#each { length: $currentDocumentStore.frames.width } as _, imageX}
						<div>
							<img
								width={$currentDocumentStore.width * scale}
								height={$currentDocumentStore.height * scale}
								alt=""
								class={`preview-image ${
									$currentFrameStore.x === imageX && $currentFrameStore.y === imageY
										? 'border-1 border-primary'
										: 'border-0'
								} outline outline-4 outline-base-300`}
								on:click={() => setXY(imageX, imageY)}
								on:keydown={() => setXY(imageX, imageY)}
								src={imageData[imageY * $currentDocumentStore.frames.width + imageX]}
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
