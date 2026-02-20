<!-- TODO: Documentation: consider documentation showcase -->

<!-- @component
Layout and logic for DialogPanel. Some of the logics for the portraits are in UniversalOverlay.svelte
-->

<script lang="ts">
	import { dialogManager } from "$pkg/components/dialog_manager/DialogManager";
	import { getAutoScrollPrefContext, getTextSpeedContext } from "$pkg/util/context/pineappleBaseContextDefinitions.svelte";
	import { onMount, tick } from "svelte";

	let currentMessage = $state("");
	let textSpeedContext = getTextSpeedContext();
	let autoScrollPrefContext = getAutoScrollPrefContext();
	let dialogPanelElement: HTMLDivElement | null = null;
	let shouldStickToBottom = true;

	const onDialogClick = () => {
		dialogManager?.skipAnimation();
	};

	const onDialogScroll = () => {
		if (!dialogPanelElement) {
			return;
		}

		const distanceToBottom =
			dialogPanelElement.scrollHeight - dialogPanelElement.scrollTop - dialogPanelElement.clientHeight;
		shouldStickToBottom = distanceToBottom <= 24;
	};

	onMount(() => {
		dialogManager.currentMessage.subscribe((value) => {
			currentMessage = value;
		});

		dialogManager.update(0);
	});

	$effect(() => {
		dialogManager.setUpdateRate((16*10) - (textSpeedContext.value*16));
	});

	$effect(() => {
		currentMessage;

		tick().then(() => {
			if (!dialogPanelElement || !shouldStickToBottom || !autoScrollPrefContext.value) {
				return;
			}

			dialogPanelElement.scrollTop = dialogPanelElement.scrollHeight;
		});
	});
</script>

<div
	tabindex="0"
	role="button"
	id="dialog-panel"
	bind:this={dialogPanelElement}
	onclick={onDialogClick}
	onscroll={onDialogScroll}
	onkeyup={(e) => {
		if (e.key === "j") {
			onDialogClick();
		}
	}}
>
	<!-- Made for 140 characters, like the original tweets -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<div id="reverse-dialog-wrapper">
		{@html currentMessage}
	</div>
</div>

<style>
	:global {
		:root {
			--color-dialog-bold: #6b8499;
			--color-dialog-italic: #a55332;
		}

		html.dark {
			--color-dialog-bold: #85a1b6;
			--color-dialog-italic: #f7b67c;
		}

		#reverse-dialog-wrapper {
			width: 100%;
		}

		#dialog-panel {
			overflow: auto;
			display: block;

			img,
			video {
				max-height: 3lh;
				display: inline;
			}

			b {
				font-weight: bolder;
				color: var(--color-dialog-bold);
			}

			i {
				color: var(--color-dialog-italic);
			}
		}
	}
</style>
