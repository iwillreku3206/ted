<script lang="ts">
	import ColorPanel from '../components/colorPanel.svelte';
	import FrameSelector from '../components/frameSelector.svelte';
	import Renderer from '../components/renderer.svelte';
	import Document from '../document/document';
	import Color from '../drawing/color';

	let workingDocument = new Document(3, 4, 3, 3);

	let selectedColor: Color = new Color(255, 0, 0, 255);
</script>

<div class="flex flex-row gap-1 bg-base-200 h-full">
	<div class="w-fit bg-base-100">
		Tools
		<button on:click={() => console.log(workingDocument)}>Debug</button>
	</div>
	<div class="w-full bg-base-100 flex flex-col">
		<Renderer
			frame={workingDocument.frames.getFrame(0, 0)}
			changePixel={(i) => {
				workingDocument.frames.getFrame(0, 0).data[i * 4] = selectedColor.r;
				workingDocument.frames.getFrame(0, 0).data[i * 4 + 1] = selectedColor.g;
				workingDocument.frames.getFrame(0, 0).data[i * 4 + 2] = selectedColor.b;
				workingDocument.frames.getFrame(0, 0).data[i * 4 + 3] = selectedColor.a;
				workingDocument = workingDocument;
			}}
		/>
		<div class="h-48">
			<FrameSelector {workingDocument} />
		</div>
	</div>
	<div class="bg-base-100"><ColorPanel bind:color={selectedColor} /></div>
</div>
