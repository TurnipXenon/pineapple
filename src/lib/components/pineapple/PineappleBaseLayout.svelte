<script lang="ts">
	export let showDialogByDefault = false;

	// For auto dark/light mode
	import { AppBar, AppShell, autoModeWatcher, LightSwitch } from "@skeletonlabs/skeleton";
	import RandomizedBackground from "$pkg/components/RandomizedBackground.svelte";

	// navigation
	import { page } from "$app/stores";
	// store
	import { enableBackground } from "$pkg/store";
	import type { BreadcrumbData } from "$pkg/types/BreadcrumbData";
	// assets
	// import DialogOverlay from "$lib/components/DialogOverlay.svelte";
	import AresLogo from "$pkg/assets/characters/ares/ares_logo.webp";
	import FABIcon from "$pkg/assets/placeholder/placeholder_circle.png";
	import CloseIcon from "$pkg/assets/icons/close.svg";
	import { dialogManager, enableDialogueOverlay } from "$pkg/components/dialog_manager/DialogManagerStore";
	import Toast from "$pkg/components/pineapple/toast/Toast.svelte";
	import DialogOverlay from "$pkg/components/DialogOverlay.svelte";
	import { fade } from "svelte/transition";
	// todo: clean up all these imports!

	let pages: BreadcrumbData[] = [];

	const updateBreadcrumb = (pathname: string) => {
		pages = [];
		let basePath = "";
		pathname.split("/").forEach((value, index) => {
			if (index === 0) {
				basePath = "/";
				pages.push({
					path: "/",
					name: "Home"
				});
				return;
			}

			if (value === "") {
				return;
			}

			basePath += value + "/";
			pages.push({
				path: basePath,
				name: value
			});
		});
		pages = pages;
	};

	$: updateBreadcrumb($page.url.pathname); // run every time we navigate

	let enableBackgroundValue = true;
	enableBackground.subscribe((value) => {
		enableBackgroundValue = value;
	});

	let enableDialogueOverlayValue = true;
	enableDialogueOverlay.subscribe((value) => {
		enableDialogueOverlayValue = value;
	});

	enableDialogueOverlay.set(showDialogByDefault);
</script>

<!-- App Shell -->
<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<!--todo: turn off hidden when it's time-->
<button type="button" class="fab" on:click={()=>{
	dialogManager.toggleDialogOverlay()
}}>
	{#if (enableDialogueOverlayValue)}
		<img class="img-icon" src={CloseIcon} alt="interactive floating action button represented as a turnip">
	{:else }
		<img src={FABIcon} alt="interactive floating action button represented as a turnip">
	{/if}
</button>

<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar
			background="app-shell-token"
			slotDefault="place-content-start"
			slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<!--TODO: add logo or something for the lead in layout-->
				<img
					alt="Ares's head titled towards the left with his tongue out and winking"
					class="ares-logo"
					src={AresLogo}
				/>
				<span class="mr-2" />
				<ol class="breadcrumb">
					{#each pages as crumb, i}
						{#if i < pages.length - 1}
							<li class="crumb" transition:fade>
								<a href={crumb.path}>{crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}</a>
							  &nbsp;&rsaquo;&nbsp;
							</li>
						{:else}
							<li class="crumb" transition:fade>{crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}</li>
						{/if}
					{/each}
				</ol>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch bgLight="bg-surface-400" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<RandomizedBackground enable={enableBackgroundValue} />

	<Toast></Toast>

	<DialogOverlay></DialogOverlay>

	<div class="default-page-container">
		<slot />
		<div class="footer-space" />
	</div>

</AppShell>

<style lang="postcss">
    :root {
        --dialog-start-pad: clamp(0em, 5vw, 2em);
        --dialog-box-width: min(calc(50em + 4em), calc(100vw - var(--dialog-start-pad) - var(--theme-border-base)));
        --dialog-box-height: clamp(15em, 50vw, 18em);

        /** FAB icon margin/position calculation origin:
						Criteria:
						- We want at mobile (360px) our margin to be at 1em (16px)
						- We want at web (1960px) our margin to be at 2em (32px)

						A useful scaling factor might vw. At 360px, 16px would be around 4.44vw (360/16).
						At 360px: margin is at 16px or 1em.
						At 1960px: 4.44vw is at 87px but that will be clamped to 32px or 2em.
						The calculation implies that the natural point that the margin becomes 2em is clamped on
						wider screens is at 727px.
				*/
        --fab-margin: clamp(1em, 4.44vw, 2em);
    }

    .default-page-container {
        @apply flex justify-center items-center;
        margin-top: 4em;
        margin-right: 1em;
        flex-direction: column;
        z-index: 0;
    }

    .ares-logo {
        object-fit: contain;
        height: 2em;
        margin-inline-end: 0.5em;
    }

    /* breadcrumb does not work due to a lot of magic stuff i do
       the code below is from skeleton's tailwind css:
       https://github.com/skeletonlabs/skeleton/blob/54f4ecedabf2be6d94a670b56dc8821095ca3fc9/packages/plugin/src/styles/components/breadcrumbs.css

       it likely disappeared due to code gen shenanigans and package magic */
    .breadcrumb,
    .breadcrumb-nonresponsive {
        @apply flex items-center w-full overflow-x-auto;
        /*@apply flex items-center space-x-4 w-full hide-scrollbar overflow-x-auto;*/
    }

    .crumb {
        @apply flex justify-center items-center;
		    margin: 0.1em;
    }

    .crumb-separator {
        @apply flex;
        color: var(--color-text-50);
    }

    /* === Auto-Responsive === */

    .breadcrumb li {
        @apply hidden md:block;
    }

    .breadcrumb li:nth-last-child(3),
    .breadcrumb li:nth-last-child(2),
    .breadcrumb li:nth-last-child(1) {
        @apply block;
    }

    .fab {
        position: fixed;
        bottom: var(--fab-margin);
        width: 4em;
        border-radius: 50%;
    }

    .fab > img {
        width: 100%;
    }

    .fab:dir(ltr) {
        right: var(--fab-margin);
    }

    .fab:dir(rtl) {
        left: var(--fab-margin);
    }
</style>
