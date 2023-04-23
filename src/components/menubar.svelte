<script lang="ts">
	import MdKeyboardArrowRight from 'svelte-icons/md/MdKeyboardArrowRight.svelte';
	interface MenuBarItem {
		label: string;
		children: SubItem[];
	}

	interface SubActionItem {
		label: string;
		action: () => void;
	}

	interface SubActionMenu {
		label: string;
		children: SubActionItem[];
	}

	type SubItem = SubActionItem | SubActionMenu;

	export let items: MenuBarItem[];
</script>

<header>
	<ul class="menu menu-compact menu-horizontal bg-base-200 w-full min-w-screen">
		{#each items as item}
			<li>
				<span>{item.label}</span>
				<ul class="menu menu-compact bg-base-300 min-w-menu">
					{#each item.children as subitem}
						{#if 'action' in subitem}
							<li><button on:click={subitem.action}>{subitem.label}</button></li>
						{:else}
							<li>
								<span class="flex flex-row">
									<span>{subitem.label}</span>
									<span class="ml-auto w-4 h-4"><MdKeyboardArrowRight /> </span>
								</span>
								<ul class="menu menu-compact bg-base-300 min-w-menu">
									{#each subitem.children as subsubitem}
										<li><button on:click={subsubitem.action}>{subitem.label}</button></li>
									{/each}
								</ul>
							</li>
						{/if}
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</header>
