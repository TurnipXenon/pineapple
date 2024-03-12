<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import "../../theme.postcss";
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	// import "@skeletonlabs/skeleton/styles/all.css";
	// Most of your app wide CSS should be put in this file
	import "$lib/app.postcss";
	// For auto dark/light mode
	import { AppBar, AppShell, autoModeWatcher, LightSwitch } from "@skeletonlabs/skeleton";
	import RandomizedBackground from "$lib/components/RandomizedBackground.svelte";

	// store
	import { enableBackground } from "$lib/store";
	// assets
	import { enableDialogueOverlay } from "$lib/components/dialog_manager/DialogManagerStore";
	import { writable } from "svelte/store";
	import { fly } from "svelte/transition";
	// todo: clean up all these imports!

	export let shouldDisplayLeadingIcons = false;

	let enableBackgroundValue = true;
	enableBackground.subscribe((value) => {
		enableBackgroundValue = value;
	});

	enableDialogueOverlay.set(false); // false by default until we unlock the fab for public

	let shouldDisplaySocialIcons = writable(false);
</script>

<!-- App Shell -->
<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<!--todo: turn off hidden when it's time-->
<!--<button type="button" class="fab" on:click={()=>{-->
<!--    enableDialogueOverlay.set(!enableDialogueOverlayValue);-->
<!--}}>-->
<!--	<img src={FABIcon} alt="interactive floating action button represented as a turnip">-->
<!--</button>-->

<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar slotDefault="place-content-start"
		        background="app-shell-token">
			<svelte:fragment slot="lead">
				<span class="lead-slot-placeholder"></span>

				{#if $$slots.extraLeadingIcons && shouldDisplayLeadingIcons}
					<div transition:fly={{x:-10}}>
						<slot name="extraLeadingIcons" />
					</div>
				{:else if $$slots.extraLeadingIcons}
					<div hidden>
						<slot name="extraLeadingIcons" />
					</div>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch bgLight="bg-surface-400" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<RandomizedBackground enable={enableBackgroundValue} />

	<!--{#if enableDialogueOverlayValue}-->
	<!-- Page Route Content -->
	<div class="default-page-container">
		<slot shouldDisplaySocialIcons={shouldDisplaySocialIcons} />
		<div class="footer-space" />
	</div>
	<!-- todo: eventually re-add	-->
	<!--	<DialogOverlay />-->
</AppShell>

<style lang="postcss">
    :root {
        --dialog-left-pad: clamp(0em, 5vw, 2em);
        --dialog-box-width: min(calc(50em + 4em), calc(100vw - var(--dialog-left-pad) - var(--theme-border-base)));
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
