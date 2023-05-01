<script lang="ts">
	import ColorPanel from '../components/color/colorPanel.svelte';
	import FrameSelector from '../components/frameSelector.svelte';
	import Renderer from '../components/renderer.svelte';

	import { currentDocumentStore } from '../stores/documentStore';
	import { currentFrameStore } from '../stores/currentFrameStore';
	import { primaryColorStore } from '../stores/colorStore';
	import { currentToolStore } from '../stores/toolStore';
	import Toolbox from '../components/toolbox.svelte';
	import NewFile from '../components/modals/newFile.svelte';
</script>

<div class="flex flex-row gap-1 bg-base-200 h-full">
	<div class="w-24 bg-base-100"><Toolbox /><NewFile /></div>
	<div class="w-full bg-base-100 flex flex-col overflow-auto">
		<Renderer
			changePixel={(i) => {
				if ($currentToolStore.type === 'brush') {
					currentDocumentStore.update((doc) => {
						const { x, y } = $currentFrameStore;

						if ($currentToolStore.type === 'brush') {
							$currentToolStore.brush.apply(
								doc.frames.frames[y][x],
								$primaryColorStore,
								i % doc.width,
								Math.floor(i / doc.width),
								new Map()
							);
						}
						return doc;
					});
				}
			}}
		/>
		<div class="h-48">
			<FrameSelector />
		</div>
	</div>
	<div class="bg-base-100"><ColorPanel /></div>
</div>
