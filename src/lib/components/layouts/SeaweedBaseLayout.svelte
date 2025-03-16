<script lang="ts">
	// For auto dark/light mode
	import { AppBar } from "@skeletonlabs/skeleton-svelte";
	import RandomizedBackground from "$lib/components/RandomizedBackground.svelte";

	// store
	import { enableBackground } from "$lib/store";
	// assets
	import { enableDialogueOverlay } from "$lib/components/dialog_manager/DialogManagerStore";
	import { writable } from "svelte/store";
	import { fly } from "svelte/transition";

	// todo: clean up all these imports!

	interface Props {
		shouldDisplayLeadingIcons?: boolean;
		extraLeadingIcons?: import("svelte").Snippet;
		s?: import("svelte").Snippet;
		children?: import("svelte").Snippet<[any]>;
	}

	let {
		shouldDisplayLeadingIcons = false,
		extraLeadingIcons,
		s,
		children
	}: Props = $props();

	let enableBackgroundValue = $state(true);
	enableBackground.subscribe((value) => {
		enableBackgroundValue = value;
	});

	enableDialogueOverlay.set(false); // false by default until we unlock the fab for public

	let shouldDisplaySocialIcons = writable(false);
</script>

<!-- App Shell -->
<!--<svelte:head>-->
<!--	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}-->
<!--</svelte:head>-->

<div>

	<!-- App Bar -->
	<AppBar background="bg-surface-600 dark:bg-surface-900">
		{#snippet lead()}

			<span class="lead-slot-placeholder"></span>

			{#if extraLeadingIcons && shouldDisplayLeadingIcons}
				<div transition:fly={{x:-10}}>
					{@render extraLeadingIcons?.()}
				</div>
			{:else if extraLeadingIcons}
				<div hidden>
					{@render s?.()}
				</div>
			{/if}

		{/snippet}
		{#snippet trail()}

			<!-- todo: -->
			<!--						<LightSwitch bgLight="bg-surface-400" />-->

		{/snippet}
	</AppBar>


	<RandomizedBackground enable={enableBackgroundValue} />

	<!--{#if enableDialogueOverlayValue}-->
	<!-- Page Route Content -->
	<div class="default-page-container">
		{@render children?.({ shouldDisplaySocialIcons, })}
		<div class="footer-space"></div>
	</div>
	<!-- todo: eventually re-add	-->
	<!--	<DialogOverlay />-->
</div>

<style lang="postcss">
    :root {
        --dialog-start-pad: clamp(0em, 5vw, 2em);
        --dialog-box-width: min(calc(50em + 4em), calc(100vw - var(--dialog-start-pad) - var(--theme-border-base)));
        --dialog-box-height: clamp(15em, 50vw, 18em);
    }

    .default-page-container {
        max-width: 2100px;
        margin: 4em auto;
        flex-direction: column;
        z-index: 0;
    }

    .lead-slot-placeholder {
        height: 3em;
        margin-inline-end: 0.5em;
    }

    /*todo: consider left handedness or customizability*/
    /*.fab {*/
    /*    @apply btn-icon variant-filled-surface;*/
    /*    position: fixed;*/
    /*    height: 5em;*/
    /*    width: 5em;*/
    /*    bottom: 3em;*/
    /*    right: 2em;*/
    /*    box-shadow: 0.5em 0.5em 0.5em gray;*/
    /*}*/
</style>
