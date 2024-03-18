<script lang="ts">
	import AresHappy from "$lib/assets/characters/ares/ares_happy.webp";
	import { onMount } from "svelte";

	import { dialogManager } from "$lib/components/dialog_manager/DialogManagerStore";

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

	onMount(() => {
		dialogManager.update(0);
	});

	let hidePercent = 100;
	let shouldHide = "hidden";
	dialogManager.hidePercent.subscribe((value) => {
		hidePercent = value * 0.4;

		// todo: fix this hack
		shouldHide = hidePercent <= -40 ? "hidden" : "visible";
	});

	const onDialogClick = () => {
		dialogManager.skipAnimation();
	};
</script>

<div class="dialog-elements" style="--hidePercentWidth: -{hidePercent}vw; --hidePercentHeight: {hidePercent}vh"
     hidden={shouldHide}>
	<img src={currentPortrait} alt="Ares" class="dialog-portrait" />
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

    .dialog-elements > img {
        transform: translateX(var(--hidePercentWidth));
    }

    .dialog-elements > div {
        transform: translateY(var(--hidePercentHeight));
    }

    .dialog-box {
        background-color: rgb(var(--color-surface-500) / 0.9);
        position: fixed;
        bottom: 0;
        left: var(--dialog-left-pad);

        width: var(--dialog-box-width); /*75em + 4em padding*/
        height: var(--dialog-box-height);
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

        /* for centering vertically */
        transform: translateX(clamp(0em, 5vw - 0.5em, 1em)) translateY(-50%);
    }

    .dialog-portrait {
        position: fixed;
        bottom: 0;
        left: clamp(-4rem, calc(5vw - 5em), 0rem);
        height: clamp(30rem, 75vw, 40rem);
        width: auto;
    }
</style>
