<script lang="ts">
	import Document from '../../document/document';
	import { currentFrameStore } from '../../stores/currentFrameStore';
	import { currentDocumentStore } from '../../stores/documentStore';
	import uniqueIdentifier from '../../util/uniqueIdentifier';

	let width = 16;
	let height = 16;

	const widthInputIdentifier = uniqueIdentifier('width-input');
	const heightInputIdentifier = uniqueIdentifier('height-input');

	function newDocument() {
		currentFrameStore.set({ x: 0, y: 0 });
		currentDocumentStore.set(new Document(width, height));
	}
</script>

<input type="checkbox" id="new-file-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-2xl mb-4">Create New Document</h3>
		<div class="flex flex-col gap-2">
			<div class="flex flex-row w-full gap-2">
				<label for={widthInputIdentifier} class="w-16 text-right">Width: </label>
				<span><input type="number" id={widthInputIdentifier} bind:value={width} />px</span>
			</div>
			<div class="flex flex-row w-full gap-2">
				<label for={heightInputIdentifier} class="w-16 text-right">Height: </label>
				<span><input type="number" name="" id={widthInputIdentifier} bind:value={height} />px</span>
			</div>
		</div>
		<div class="modal-action">
			<label for="new-file-modal" on:click={newDocument} on:keypress={newDocument} class="btn"
				>Create!</label
			>
		</div>
	</div>
</div>
