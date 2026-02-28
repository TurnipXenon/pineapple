<!-- TODO: Documentation: consider documentation showcase -->

<!-- @component
Layout and logic for DialogPanel. Some of the logics for the portraits are in UniversalOverlay.svelte
-->

<script lang="ts">
	import { dialogManager } from "$pkg/components/dialog_manager/DialogManager";
	import {
		getAutoScrollPrefContext,
		getTextSpeedContext
	} from "$pkg/util/context/pineappleBaseContextDefinitions.svelte";
	import { onMount, tick } from "svelte";

	let currentMessage = $state("");
	let textSpeedContext = getTextSpeedContext();
	let autoScrollPrefContext = getAutoScrollPrefContext();
	let dialogPanelElement: HTMLDivElement | null = null;
	let shouldStickToBottom = true;
	let divRole = $state<"button" | undefined>();

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

		dialogManager.isDoneTransitionWritable.subscribe(value => {
			divRole = value ? undefined : "button";
		});

		dialogManager.update(0);
	});

	$effect(() => {
		dialogManager.setUpdateRate((16 * 10) - (textSpeedContext.value * 16));
	});

	$effect(() => {
		// funny loner variable below cause we want to trigger everything below when it changes
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		currentMessage;

		tick().then(() => {
			if (!dialogPanelElement || !shouldStickToBottom || !autoScrollPrefContext.value) {
				return;
			}

			dialogPanelElement.scrollTop = dialogPanelElement.scrollHeight;
		});
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	tabindex={divRole === "button" ? 0 : undefined}
	role={divRole}
	aria-label={divRole === "button" ? "Skip text animation" : undefined}
	id="dialog-panel"
	bind:this={dialogPanelElement}
	onclick={onDialogClick}
	onscroll={onDialogScroll}
	onkeydown={(e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onDialogClick();
		}
	}}
	onkeyup={(e) => {
		if (e.key === "j") {
			onDialogClick();
		}
	}}
>
	<!-- Made for 140 characters, like the original tweets -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<div id="reverse-dialog-wrapper">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
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
