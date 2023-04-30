<script lang="ts">
	import '../styles/index.css';
	import Menubar from '../components/menubar.svelte';
</script>

<main class="h-screen max-h-screen min-h-screen flex flex-col overflow-clip">
	<Menubar
		items={[
			{
				label: 'File',
				children: [
					{
						label: 'New',
						action: () => {
							console.log('New');
						}
					},
					{
						label: 'Recent...',
						children: [
							{
								label: 'File 1',
								action: () => {
									console.log('File 1');
								}
							},
							{
								label: 'File 2',
								action: () => {
									console.log('File 2');
								}
							}
						]
					}
				]
			}
		]}
	/>
	<slot />
</main>
