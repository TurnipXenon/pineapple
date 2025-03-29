<script lang="ts">
	import { run } from "svelte/legacy";


	// For auto dark/light mode
	import { AppBar } from "@skeletonlabs/skeleton-svelte";
	import RandomizedBackground from "$pkg/components/RandomizedBackground.svelte";

	// navigation
	import { page } from "$app/stores";
	// store
	import { enableBackground } from "$pkg/store";
	import type { BreadcrumbData } from "$pkg/types/BreadcrumbData";
	// assets
	// import DialogOverlay from "$lib/components/DialogOverlay.svelte";
	import AresLogo from "$pkg/assets/characters/ares/ares_logo.webp";
	import FABIcon from "$pkg/assets/bg_tiled/bg_tiled_turnip.png";
	import CloseIcon from "$pkg/assets/icons/close.svg";
	import { enableDialogueOverlay } from "$pkg/components/dialog_manager/DialogManagerStore";
	import Toast from "$pkg/components/pineapple/toast/Toast.svelte";
	import DialogOverlay from "$pkg/components/dialog_overlay/DialogOverlay.svelte";
	import { fade } from "svelte/transition";
	import { dialogManager } from "$pkg/components/dialog_manager/DialogManager";

	interface Props {
		showDialogByDefault?: boolean;
		children?: import("svelte").Snippet;
	}

	let { showDialogByDefault = false, children }: Props = $props();
	// todo: clean up all these imports!

	let pages: BreadcrumbData[] = $state([]);

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

	run(() => {
		updateBreadcrumb($page.url.pathname);
	}); // run every time we navigate

	let enableBackgroundValue = $state(true);
	enableBackground.subscribe((value) => {
		enableBackgroundValue = value;
	});

	let enableDialogueOverlayValue = $state(true);
	enableDialogueOverlay.subscribe((value) => {
		enableDialogueOverlayValue = value;
	});

	enableDialogueOverlay.set(showDialogByDefault);
</script>

<!--todo: turn off hidden when it's time-->
<button class="fab" onclick={()=>{
	dialogManager.toggleDialogOverlay();
}}>
	{#if (enableDialogueOverlayValue)}
		<img class="turnip-icon" src={CloseIcon} alt="interactive floating action button represented as a turnip">
	{:else }
		<img class="turnip-icon" src={FABIcon} alt="interactive floating action button represented as a turnip">
	{/if}
</button>

<div>
	<!-- todo: header #migration -->
	<!-- App Bar -->
	<AppBar
		background="bg-surface-600 dark:bg-surface-900">
		{#snippet lead()}

			<!--TODO: add logo or something for the lead in layout-->
			<img
				alt="Ares's head titled towards the left with his tongue out and winking"
				class="ares-logo"
				src={AresLogo}
			/>
			<span class="mr-2"></span>
			<ol class="breadcrumb">
				{#each pages as crumb, i}
					{#if i < pages.length - 1}
						<li class="crumb" in:fade>
							<a href={crumb.path}>{crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}</a>
							 › 
						</li>
					{:else}
						<li class="crumb" in:fade>{crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}</li>
					{/if}
				{/each}
			</ol>

		{/snippet}
		{#snippet trail()}

			<!--			todo: light switch #migration -->
			<!--			<LightSwitch bgLight="bg-surface-400" />-->

		{/snippet}
	</AppBar>


	<RandomizedBackground enable={enableBackgroundValue} />

	<Toast></Toast>

	<DialogOverlay></DialogOverlay>

	<div class="default-page-container">
		{@render children?.()}
		<div class="footer-space"></div>
	</div>

</div>

<style lang="postcss">
    /*todo*/
    /*@apply flex justify-center items-center;*/
    .default-page-container {
        display: flex;
        width: 100%;
        padding: 1lh clamp(8px, 10vw, 2em);
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
        /*todo: */
        /*@apply flex items-center w-full overflow-x-auto;*/
    }

    .crumb {
        /*todo: */
        /*@apply flex justify-center items-center;*/
        margin: 0.1em;
    }

    .crumb-separator {
        /*todo: */
        /*@apply flex;*/
        color: var(--color-text-50);
    }

    /* === Auto-Responsive === */

    .breadcrumb li {
        /*@apply hidden md:block;*/
    }

    .breadcrumb li:nth-last-child(3),
    .breadcrumb li:nth-last-child(2),
    .breadcrumb li:nth-last-child(1) {
        /*@apply block;*/
    }

    .fab {
		    position: fixed;
        padding: 0;
        bottom: var(--fab-margin);
        width: 4em;
        border-radius: 50%;
        z-index: 100;
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

    .turnip-icon {
        margin: 4px;
    }
</style>
