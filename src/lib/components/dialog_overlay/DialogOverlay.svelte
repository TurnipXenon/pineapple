<script lang="ts">
	import AresHappy from "$pkg/assets/characters/ares/ares_happy.webp";
	import { onMount } from "svelte";
	import { DialogState } from "$pkg/types/pineapple_fiber/DialogState";
	import { getDialogManager } from "$pkg/components/dialog_manager/DialogMangerInit";
	import type { IDialogManager } from "$pkg/components/dialog_manager/IDialogManager";
	import PinyaCard from "$pkg/ui/elements/PinyaCard/PinyaCard.svelte";

	let currentMessage = $state("");
	let currentPortrait = $state(AresHappy);

	let hidePercent = $state(100);
	let isHidden = $state(true);
	let dialogManager: IDialogManager | undefined = $state(undefined);
	onMount(() => {
		getDialogManager()
			.then(dm => {
				dialogManager = dm;

				dialogManager.currentMessage.subscribe((value) => {
					currentMessage = value;
				});

				dialogManager.currentPortrait.subscribe((value) => {
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

				dialogManager.update(0);
			});

	});

	const onDialogClick = () => {
		dialogManager?.skipAnimation();
	};

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
			className="dialog-name"
		>
			<div>
				<b class="fake-h1">Turnip</b>
			</div>
		</PinyaCard>
		<PinyaCard
			widthClass="w-full"
			className="dialog-text"
		>
			<!-- Made for 140 characters, like the original tweets -->
			{@html currentMessage}
		</PinyaCard>
	</div>
</div>

<style>
    :global(.dialog-text) {
        font-size: 1.75em;
        height: 100%;
        padding: 1.2lh 2rem 0.5lh;
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

    :global(.dialog-box *,.dialog-name *) {
        font-size: clamp(1em, 5vw, 1.3em);
        line-height: 1.5em;
    }

    .dialog-padding :global(p) {
        font-size: clamp(1em, 5vw, 1.3em) !important;
        line-height: 1.5em !important;
    }

    .dialog-padding {
        padding: clamp(1.5em, 5vw, 1.75em) clamp(0em, 5vw - 0.5em, 2em) 0;
    }

    :global(.dialog-name) {
        padding-left: 2rem;
        padding-right: 2rem;
        position: fixed;
    }

    :global(.dialog-name:dir(ltr)) {
        /* for centering vertically */
        transform: translateX(clamp(0em, 5vw - 0.5em, 1em)) translateY(-50%);
    }

    :global(.dialog-name:dir(rtl)) {
        /* for centering vertically */
        transform: translateX(calc(clamp(0em, 5vw - 0.5em, 1em) * -1)) translateY(-50%);
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


    .dialog-box {
        background-color: var(--color-surface-500);
        position: fixed;
        bottom: 0;
        width: var(--dialog-box-width); /*75em + 4em padding*/
        height: var(--dialog-box-height);
        max-width: calc(100vw - ((var(--fab-margin) * 2) + 4em));
        border-radius: 1rem;
    }

    .dark .dialog-box {
        background-color: rgb(var(--color-surface-900) / 0.95);
        --tw-ring-color: rgb(var(--color-text-400));
        /*background-color: red;*/
    }
</style>
