<script lang="ts">
	export let pixels: string[];

	export let changePixel: (i: number) => void;

	export let width = 8;
	export let height = 8;

	function globalKeyDown(e: KeyboardEvent) {
		if (e.key === ' ') {
			spaceDown = true;
		}
	}

	function rendererMouseDown(e: MouseEvent) {
		if (e.button === 1) {
			middleClickDown = true;
		}
		if (e.button === 0) {
			leftClickDown = true;
		}
	}

	function globalKeyUp(e: KeyboardEvent) {
		if (e.key === ' ') {
			spaceDown = false;
		}
	}

	function globalMouseUp(e: MouseEvent) {
		if (e.button === 1) {
			middleClickDown = false;
		}
		if (e.button === 0) {
			leftClickDown = false;
		}
	}

	function globalMouseMove(e: MouseEvent) {
		if (panning) {
			camX += e.movementX;
			camY += e.movementY;
		}
	}

	function rendererOnWheel(e: WheelEvent) {
		console.log(e);
		zoom -= e.deltaY / 1000;
	}

	let zoom = 1;
	let camX = 0;
	let camY = 0;

	let middleClickDown = false;
	let leftClickDown = false;
	let spaceDown = false;

	$: panning = middleClickDown || (spaceDown && leftClickDown);

	let mouseDown = false;
</script>

<svelte:window
	on:mouseup={globalMouseUp}
	on:keyup={globalKeyUp}
	on:keydown={globalKeyDown}
	on:mousemove={globalMouseMove}
/>

<div
	class="grid place-items-center h-full overflow-clip"
	on:mousedown={rendererMouseDown}
	on:wheel={rendererOnWheel}
>
	<div style={`transform: translateX(${camX}px) translateY(${camY}px) scale(${zoom})`}>
		{#each { length: height } as _, y}
			<div class="flex flex-row">
				{#each { length: width } as _, x}
					<div
						class="w-12 h-12 border-r-1/2 border-b-1/2 border-gray-300"
						on:click={() => changePixel(y * width + x)}
						on:mousedown={(e) => {
							e.preventDefault();
							changePixel(y * width + x);
							mouseDown = true;
						}}
						on:mouseover={(e) => {
							e.preventDefault();
							mouseDown && changePixel(y * width + x);
						}}
						on:mouseup={(e) => {
							e.preventDefault();
							mouseDown = false;
						}}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								changePixel(y * width + x);
							}
						}}
						on:focus={() => {
							/**/
						}}
						style="background-color: {pixels[y * width + x]}"
					/>
				{/each}
			</div>
		{/each}
	</div>
</div>
