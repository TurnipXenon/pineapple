<script lang="ts">
	import AresHappy from "$pkg/assets/characters/ares/ares_happy.webp";
	import { onMount } from "svelte";
	import { dialogManager } from "$pkg/components/dialog_manager/DialogManagerStore";
	import { DialogState } from "$pkg/types/pineapple_fiber/DialogState";

	let currentMessage = "";
	dialogManager.currentMessage.subscribe((value) => {
		currentMessage = value;
	});

	let currentPortrait = AresHappy;
	dialogManager.currentPortrait.subscribe((value) => {
		if (value) {
			currentPortrait = value;
		}
	});

	let hidePercent = 100;
	let isHidden = true;
	onMount(() => {
		dialogManager.hidePercent.subscribe((value) => {
			hidePercent = value * 0.4;
			isHidden = false;
		});

		dialogManager.currentReadableState.subscribe((value) => {
			isHidden = value === DialogState.Invisible;
		});

		dialogManager.update(0);
	});

	const onDialogClick = () => {
		dialogManager.skipAnimation();
	};

</script>

<div class="dialog-elements"
     hidden={isHidden}
     style="--hidePercentWidth: -{hidePercent}vw;
            --hidePercentHeight: {hidePercent}vh;">
	<div class="dialog-portrait-container">
		<img src={currentPortrait} alt="Ares" class="dialog-portrait" />
	</div>
	<div class="card dialog-box variant-ghost-primary" on:click={onDialogClick}>
		<div class="card dialog-name">
			<p><b>Turnip</b></p>
		</div>
		<section class="dialog-padding">
			<!-- Made for 140 characters, like the original tweets -->
			{@html currentMessage}
		</section>
	</div>
</div>

<style>
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

    .dialog-box *,
    .dialog-name * {
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

    .dialog-name {
        @apply pt-2 px-4;
        position: fixed;
    }

    .dialog-name:dir(ltr) {
        /* for centering vertically */
        transform: translateX(clamp(0em, 5vw - 0.5em, 1em)) translateY(-50%);
    }

    .dialog-name:dir(rtl) {
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
</style>
