<script>
	import ColorPanel from '../components/colorPanel.svelte';
	import Renderer from '../components/renderer.svelte';

	let pixels = Array(64).fill('#000000');

	let selectedColor = '#000000';
</script>

<div class="flex flex-row gap-1 bg-base-200 h-full">
	<div class="w-fit bg-base-100">Tools</div>
	<div class="w-full bg-base-100">
		<Renderer {pixels} changePixel={(i) => (pixels[i] = selectedColor)} />
	</div>
	<div class="bg-base-100"><ColorPanel bind:hex={selectedColor} /></div>
</div>
