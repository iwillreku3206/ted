<script>
	import Renderer from '../components/renderer.svelte';

	let pixels = Array(64).fill('#000000');
	let selectedColor = '#000000';
</script>

<div class="h-full min-h-screen flex flex-row gap-1 bg-base-200">
	<div class="w-fit bg-base-100">
		<input type="color" bind:value={selectedColor} />
		<button
			on:click={() => {
				console.log(selectedColor);
			}}>test</button
		>
	</div>
	<div class="w-full bg-base-100">
		<Renderer {pixels} changePixel={(i) => pixels[i] = selectedColor} />
	</div>
	<div class="w-32 bg-base-100">1</div>
</div>
