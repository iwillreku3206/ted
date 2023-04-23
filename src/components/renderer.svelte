<script lang="ts">
	export let pixels: string[];

	export let changePixel: (i: number) => void;

	export let width = 8;
	export let height = 8;
</script>

{#each { length: height } as _, y}
	<div class="flex flex-row">
		{#each { length: width } as _, x}
			<div
				class="w-12 h-12 border-r-1/2 border-b-1/2 border-gray-300"
				on:click={() => changePixel(y * width + x)}
        on:keydown={(e) => {
          if (e.key === 'Enter') {
            changePixel(y * width + x);
          }
        }}
				style="background-color: {pixels[y * width + x]}"
			/>
		{/each}
	</div>
{/each}
