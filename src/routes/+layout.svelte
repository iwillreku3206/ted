<script lang="ts">
	import '../styles/index.css';
	import Menubar from '../components/menubar.svelte';
	import type { ComponentProps } from 'svelte';
	import { dev } from '$app/environment';
	import { currentDocumentStore } from '../stores/documentStore';

	const items: ComponentProps<Menubar>['items'] = [
		{
			label: 'File',
			children: [
				{
					label: 'New',
					isLabel: true,
					labelFor: 'new-file-modal'
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
		},
		{
			label: 'Edit',
			children: [
				{
					label: 'Undo',
					action: () => {
						console.log('Undo');
					}
				},
				{
					label: 'Redo',
					action: () => {
						console.log('Redo');
					}
				}
			]
		},
		{
			label: 'View',
			children: [
				{
					label: 'Zoom In',
					action: () => {
						console.log('Zoom In');
					}
				},
				{
					label: 'Zoom Out',
					action: () => {
						console.log('Zoom Out');
					}
				},
				{
					label: 'Reset Zoom',
					action: () => {
						console.log('Reset Zoom');
					}
				}
			]
		},
		{
			label: 'Help',
			children: [
				{
					label: 'About',
					action: () => {
						console.log('About');
					}
				}
			]
		}
	];

	if (dev) {
		items.push({
			label: 'Dev',
			children: [
				{
					label: 'Reload',
					action: () => {
						window.location.reload();
					}
				},
				{
					label: 'Log...',
					children: [
						{
							label: 'Document Store',
							action: () => {
								console.log($currentDocumentStore);
							}
						},
						{
							label: 'Document Store (JSON)',
							action: () => {
								console.log(JSON.stringify($currentDocumentStore));
							}
						},
            {
              label: 'Document Store (JSON length)',
              action: () => {
                console.log(JSON.stringify($currentDocumentStore).length);
              }
            }
					]
				}
			]
		});
	}
</script>

<main class="h-screen max-h-screen min-h-screen flex flex-col overflow-clip">
	<Menubar {items} />
	<slot />
</main>
