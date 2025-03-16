<script lang="ts">
	import { ConfirmationModal } from '$pkg/ui/templates/index.js';
	import type { ModalProps } from 'svelte-modals';

	let props: ModalProps = $props();
</script>

<ConfirmationModal
	confirm={{
		onclick: () => { alert('success!'); },
		title: 'simple success alert'
	}}
	{...props}
>
	<h2>Header 2</h2>
	<p>I can put things here</p>
</ConfirmationModal>