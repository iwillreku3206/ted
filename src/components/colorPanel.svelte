<script lang="ts">
	import { HslToRgbFn, RgbToHsl } from '../util/colorConversion';
	import HslColorPicker from './hslColorPicker.svelte';
	let hue = 0;
	let saturation = 100;
	let lightness = 50;
	$: r = Math.round(HslToRgbFn(0, hue, saturation, lightness) * 255);
	$: g = Math.round(HslToRgbFn(8, hue, saturation, lightness) * 255);
	$: b = Math.round(HslToRgbFn(4, hue, saturation, lightness) * 255);

	export let hex = '#000000';

	$: hex = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

	function updateHSL() {
		hue = Math.round(RgbToHsl(r, g, b).h);
		saturation = Math.round(RgbToHsl(r, g, b).s);
		lightness = Math.round(RgbToHsl(r, g, b).l);
	}
</script>

<div class="p-4 picker-container">
	<HslColorPicker bind:hue bind:saturation bind:lightness />
	<div class="flex flex-row gap-2">
		<div
			class="h-auto w-12 aspect-square"
			style={`background-color: hsl(${hue}, ${saturation}%, ${lightness}%)`}
		/>
		<div class="grid grid-cols-3 gap-2">
			<div>
				R: <input
					type="number"
					class="w-12"
					bind:value={r}
					on:change={updateHSL}
					on:input={updateHSL}
				/>
			</div>
			<div>
				G: <input
					type="number"
					class="w-12"
					bind:value={g}
					on:change={updateHSL}
					on:input={updateHSL}
				/>
			</div>
			<div>
				B: <input
					type="number"
					class="w-12"
					bind:value={b}
					on:change={updateHSL}
					on:input={updateHSL}
				/>
			</div>
			<div>
				H: <input type="number" class="w-12" bind:value={hue} />
			</div>
			<div>
				S: <input type="number" class="w-12" bind:value={saturation} />
			</div>
			<div>
				L: <input type="number" class="w-12" bind:value={lightness} />
			</div>
		</div>
	</div>
		<div>
			Hex: <code>{hex}</code>
		</div>
</div>

<style>
</style>
