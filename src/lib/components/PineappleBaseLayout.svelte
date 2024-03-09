<script lang="ts">
    // The ordering of these imports is critical to your app working properly
    import "../theme.postcss";
    // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
    // import "@skeletonlabs/skeleton/styles/all.css";
    // Most of your app wide CSS should be put in this file
    import "$lib/app.postcss";
    // For auto dark/light mode
    import {AppBar, AppShell, autoModeWatcher, LightSwitch} from "@skeletonlabs/skeleton";
    import RandomizedBackground from "$lib/components/RandomizedBackground.svelte";

    // navigation
    import {page} from "$app/stores";
    // store
    import {enableBackground} from "$lib/store";
    import type {BreadcrumbData} from "$lib/types/BreadcrumbData";
    // assets
    import DialogOverlay from "$lib/components/DialogOverlay.svelte";
    import AresLogo from "$lib/assets/characters/ares/ares_logo.webp";
    import {enableDialogueOverlay} from "$lib/components/dialog_manager/DialogManagerStore";
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
</script>

<!-- App Shell -->
<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar slotDefault="place-content-start" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<!--TODO: add logo or something for the lead in layout-->
				<img
						alt="Ares's head titled towards the left with his tongue out and winking"
						class="ares-logo"
						src={AresLogo}
				/>
				<span class="mr-2"/>
				<ol class="breadcrumb">
					{#each pages as crumb, i}
						{#if i < pages.length - 1}
							<li class="crumb">
								<a href={crumb.path}>{crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}</a>
							</li>
							<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
						{:else}
							<li class="crumb">{crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}</li>
						{/if}
					{/each}
				</ol>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch bgLight="bg-surface-400"/>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<RandomizedBackground enable={enableBackgroundValue}/>

	{#if enableDialogueOverlayValue}
		<!-- Page Route Content -->
		<div class="default-page-container">
			<slot/>
			<div class="footer-space"/>
		</div>
		<DialogOverlay/>
	{:else}
		<DialogOverlay/>
		<slot/>
	{/if}
</AppShell>

<style lang="postcss">
    :root {
        --dialog-left-pad: clamp(0em, 5vw, 2em);
        --dialog-box-width: min(calc(50em + 4em), calc(100vw - var(--dialog-left-pad) - var(--theme-border-base)));
        --dialog-box-height: clamp(15em, 50vw, 18em);
    }

    .default-page-container {
        @apply flex justify-center items-center;
        margin-top: 4em;
        margin-left: clamp(1em, 15vw, 10em);
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
        @apply flex items-center space-x-4 w-full overflow-x-auto;
        /*@apply flex items-center space-x-4 w-full hide-scrollbar overflow-x-auto;*/
    }

    .crumb {
        @apply flex justify-center items-center space-x-2;
    }

    .crumb-separator {
        @apply flex text-surface-700-200-token opacity-50;
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
</style>
