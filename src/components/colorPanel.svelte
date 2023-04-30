<script lang="ts">
	import Color from '../drawing/color';
	import { primaryColorStore } from '../stores/colorStore';
	import HslColorPicker from './hslColorPicker.svelte';

	export let color = new Color(5, 127, 127, 255);
  $: primaryColorStore.set(color);
	$: hex = color.toRGBAHex();
</script>

<div class="p-4 picker-container">
	<HslColorPicker bind:color />
	<div class="flex flex-row gap-2">
		<div class="h-auto w-12 aspect-square" style={`background-color: ${hex}`} />
		<div class="grid grid-cols-3 gap-2">
			<div>
				R: <input type="number" class="w-12" bind:value={color.r} />
			</div>
			<div>
				G: <input type="number" class="w-12" bind:value={color.g} />
			</div>
			<div>
				B: <input type="number" class="w-12" bind:value={color.b} />
			</div>
			<div>
				H: <input type="number" class="w-12" bind:value={color.h} />
			</div>
			<div>
				S: <input type="number" class="w-12" bind:value={color.s} />
			</div>
			<div>
				L: <input type="number" class="w-12" bind:value={color.l} />
			</div>
		</div>
	</div>
	<div>
		Hex: <code>{hex}</code>
	</div>
</div>

<style>
</style>
