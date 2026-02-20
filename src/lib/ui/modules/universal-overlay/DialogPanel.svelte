<!-- TODO: Documentation: consider documentation showcase -->

<!-- @component
Layout and logic for DialogPanel. Some of the logics for the portraits are in UniversalOverlay.svelte
-->

<script lang="ts">
	import { dialogManager } from "$pkg/components/dialog_manager/DialogManager";
	import { getTextSpeedContext } from "$pkg/util/context/pineappleBaseContextDefinitions.svelte";
	import { onMount } from "svelte";

	let currentMessage = $state("");
	let textSpeedContext = getTextSpeedContext();

	const onDialogClick = () => {
		dialogManager?.skipAnimation();
	};

	onMount(() => {
		dialogManager.currentMessage.subscribe((value) => {
			currentMessage = value;
		});

		dialogManager.update(0);
	});

	$effect(() => {
		dialogManager.setUpdateRate(100 - textSpeedContext.value);
	});
</script>

<div
	tabindex="0"
	role="button"
	id="dialog-panel"
	onclick={onDialogClick}
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
			min-height: 100%;
			position: relative;
		}

		#dialog-panel {
			overflow: auto;
			display: flex;
			flex-direction: column-reverse;

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
