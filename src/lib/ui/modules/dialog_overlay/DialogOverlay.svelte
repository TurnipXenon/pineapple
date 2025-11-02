<!-- TODO: Migration: review and migrate this component -->

<script lang="ts">
	import FABIcon from "$pkg/assets/bg_tiled/bg_tiled_turnip.png";

	import AresHappy from "$pkg/assets/characters/ares/ares_happy.webp";
	import CloseIcon from "$pkg/assets/icons/close.svg";
	import { dialogManager } from "$pkg/components/dialog_manager/DialogManager";
	import { enableDialogueOverlay } from "$pkg/components/dialog_manager/DialogManagerStore";
	import { DialogState } from "$pkg/types/pineapple_fiber/DialogState";
	import { appState } from "$pkg/ui/templates/PinyaPageLayout/runes.svelte";
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";
	import PinyaButton from "../../elements/PinyaButton/PinyaButton.svelte";
	import PinyaCard from "../../elements/PinyaCard/PinyaCard.svelte";

	let currentMessage = $state("");
	let currentPortrait = $state(AresHappy);
	let isMounted = $state(false);

	let hidePercent = $state(100);
	let isHidden = $state(true);
	onMount(() => {

		dialogManager.currentMessage.subscribe((value) => {
			currentMessage = value;
		});

		dialogManager.currentPortrait.subscribe((value) => {
			console.log("sub value", value);
			if (value) {
				currentPortrait = value;
			}
		});

		dialogManager.hidePercent.subscribe((value) => {
			hidePercent = value * 0.4;
			isHidden = false;
		});

		dialogManager.currentReadableState.subscribe((value) => {
			isHidden = value === DialogState.Invisible;
		});

		console.log("CAlling update");
		dialogManager.update(0);
		isMounted = true;

	});

	const onDialogClick = () => {
		dialogManager?.skipAnimation();
	};

	let enableDialogueOverlayValue = $state(true);
	enableDialogueOverlay.subscribe((value) => {
		enableDialogueOverlayValue = value;
	});

	enableDialogueOverlay.set(appState.enableDialogOnByDefault ?? false);
</script>

<div class="dialog-elements"
     hidden={isHidden}
     style="--hidePercentWidth: -{hidePercent}vw;
            --hidePercentHeight: {hidePercent}vh;">
	<div class="dialog-portrait-container">
		<img src={currentPortrait} alt="Ares" class="dialog-portrait" />
	</div>
	<div
		tabindex="0"
		role="button"
		class="dialog-box"
		onclick={onDialogClick}
		onkeyup={(e) => {
			if (e.key === 'j') {
				onDialogClick()
;			}
		}}
	>
		<PinyaCard
			widthClass=""
			paddingClass=""
			id="dialog-name"
		>
			<div class="fake-h1">Turnip</div>
		</PinyaCard>
		<PinyaCard
			widthClass="w-full"
			className="dialog-text"
			colorClass=""
			flexClass=""
			borderClass="border-primary-500 dark:border-0"
		>
			<div id="text-container">
				<!-- Made for 140 characters, like the original tweets -->
				{@html currentMessage}
			</div>
		</PinyaCard>
	</div>
</div>


{#if appState.allowDialog && isMounted}
	<div class="fab-container" transition:slide>
		<PinyaButton
			classes="fab"
			onclick={()=>{dialogManager.toggleDialogOverlay();}}
		>
			{#if (enableDialogueOverlayValue)}
				<img class="turnip-icon" src={CloseIcon} alt="interactive floating action button represented as a turnip">
			{:else }
				<img class="turnip-icon" src={FABIcon} alt="interactive floating action button represented as a turnip">
			{/if}
		</PinyaButton>
	</div>
{/if}

<style>
    :global(.dialog-text) {
        height: 100%;
        padding: 0.8lh 2rem 0.5lh;
        font-size: clamp(1rem, 3vw, 1.75rem);
        line-height: calc(clamp(1rem, 3vw, 1.75rem) * 1.5);
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .dialog-elements {
        position: fixed;
        z-index: 10;
    }

    .dialog-elements:dir(ltr) {
        left: 0;
    }

    .dialog-elements:dir(rtl) {
        right: 0;
    }

    .dialog-elements > div {
        transform: translateY(var(--hidePercentHeight));
    }

    :global {
        #dialog-name {
            padding: 0 2rem;
            position: fixed;

            &:dir(ltr) {
                /* for centering vertically */
                transform: translateX(clamp(0em, 5vw - 0.5em, 1em)) translateY(-50%);
            }

            &:dir(rtl) {
                /* for centering vertically */
                transform: translateX(calc(clamp(0em, 5vw - 0.5em, 1em) * -1)) translateY(-50%);
            }
        }
    }

    .dialog-portrait-container {
        position: fixed;
        bottom: 0;
        height: clamp(30rem, 75vw, 40rem);
        width: auto;
    }

    .dialog-portrait-container:dir(ltr) {
        transform: translateX(var(--hidePercentWidth));
        left: clamp(-4rem, calc(5vw - 5em), 0rem);
    }

    .dialog-portrait-container:dir(rtl) {
        transform: translateX(calc(var(--hidePercentWidth) * -1));
        right: clamp(-4rem, calc(5vw - 5em), 0rem);
    }

    .dialog-portrait {
        height: 100%;
    }

    .dialog-portrait:dir(rtl) {
        transform: scaleX(-1);
    }

    :global(html) {
        --bg-dialog: rgba(255, 247, 225, 0.9);
    }

    :global(html.dark) {
        --bg-dialog: rgba(76, 71, 59, 0.9);
    }

    .dialog-box {
        background-color: var(--bg-dialog);
        position: fixed;
        bottom: 0;
        width: var(--dialog-box-width); /*75em + 4em padding*/
        height: var(--dialog-box-height);
        max-width: calc(100vw - ((var(--fab-margin) * 3) + (clamp(2rem, 5vw, 4rem))));
        border-radius: 1rem;
    }

    :global(.fab) {
        position: relative;
        transform: scale3d(1, 1, 1.5);
        background-color: var(--color-tertiary-500);
        padding: 0.3rem;
        width: clamp(2rem, 5vw, 4rem);
        border-radius: 50%;
        z-index: 100;
        box-shadow: 3px 3px 3px var(--shadow-color);
        margin-bottom: var(--fab-margin);
    }

    .fab-container {
        position: fixed;
        bottom: 0;
    }

    .fab-container:dir(ltr) {
        right: 0;
    }

    .fab-container:dir(rtl) {
        left: 0;
    }

    :global(.fab > img) {
        width: 100%;
        filter: brightness(0) invert(1);
    }

    :global(.fab:dir(ltr)) {
        margin-right: var(--fab-margin);
    }

    :global(.fab:dir(rtl)) {
        margin-left: var(--fab-margin);
    }

    #text-container {
        overflow-y: auto;
    }
</style>
