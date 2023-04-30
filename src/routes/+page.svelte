<script lang="ts">
	import ColorPanel from '../components/colorPanel.svelte';
	import FrameSelector from '../components/frameSelector.svelte';
	import Renderer from '../components/renderer.svelte';
	import PixelBrush from '../drawing/brush/pixel';

	import { currentDocumentStore } from '../stores/documentStore';
	import { currentFrameStore } from '../stores/currentFrameStore';
	import { primaryColorStore } from '../stores/colorStore';
</script>

<div class="flex flex-row gap-1 bg-base-200 h-full">
	<div class="w-fit bg-base-100">Tools</div>
	<div class="w-full bg-base-100 flex flex-col">
		<Renderer
			changePixel={(i) => {
				currentDocumentStore.update((doc) => {
					const { x, y } = $currentFrameStore;
					PixelBrush.apply(
						doc.frames.frames[y][x],
						$primaryColorStore,
						i % doc.width,
						Math.floor(i / doc.width),
						new Map()
					);
					return doc;
				});
			}}
		/>
		<div class="h-48">
			<FrameSelector />
		</div>
	</div>
	<div class="bg-base-100"><ColorPanel /></div>
</div>
