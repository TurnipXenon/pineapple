<!-- @component
Layout and logic for DialogPanel. Some of the logics for the portraits are in UniversalOverlay.svelte
-->

<script lang="ts">
	import { dialogManager } from "$pkg/components/dialog_manager/DialogManager";
	import { onMount } from "svelte";

	let currentMessage = $state("");

	const onDialogClick = () => {
		dialogManager?.skipAnimation();
	};

	onMount(() => {
		dialogManager.currentMessage.subscribe((value) => {
			currentMessage = value;
		});

		dialogManager.update(0);
	});
</script>

<div
	id="dialog-main"
	tabindex="0"
	role="button"
	onclick={onDialogClick}
	onkeyup={(e) => {
					if (e.key === 'j') {
						onDialogClick();
					}
				}}
>
	<!-- todo: site map -->
	Site map
	<!-- Made for 140 characters, like the original tweets -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html currentMessage}
</div>
