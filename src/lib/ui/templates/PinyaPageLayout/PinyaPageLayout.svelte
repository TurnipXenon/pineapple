<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import { dialogManager } from "$pkg";
	import AresLogo from "$pkg/assets/characters/ares/ares_logo.webp";
	import SettingsLogo from "$pkg/assets/icons/icon-settings.svg";
	import HamburgerIcon from "$pkg/assets/icons/icon-menu.svg";
	import DialogIcon from "$pkg/assets/icons/icon-chat.svg";

	import { m } from "$pkg/external/paraglide/messages";
	import { localizeHref } from "$pkg/external/paraglide/runtime";
	import { enableBackground } from "$pkg/store";
	import RandomizedBackground from "$pkg/ui/components/randomized-background/RandomizedBackground.svelte";
	import { ButtonVariant, ColorScheme, ImageIcon } from "$pkg/ui/elements/index";
	import GeneralSettingsModal from "$pkg/ui/modules/modals/general-settings/GeneralSettingsModal.svelte";
	import NavigationModal from "$pkg/ui/modules/modals/general-settings/NavigationModal.svelte";
	import UniversalOverlay from "$pkg/ui/modules/universal-overlay/UniversalOverlay.svelte";
	import { getEnableDialogOverlayContext } from "$pkg/util/context/pineappleBaseContextDefinitions";
	import type { Snippet } from "svelte";
	import { modals } from "svelte-modals";
	import PinyaButton from "../../elements/PinyaButton/PinyaButton.svelte";
	import { appState } from "./pinyaPageLayoutRunes.svelte.js";

	let {
		children,
		appBarLead = $bindable(),
		footer,
		appBardEndStyle = "functional"
	}: {
		children: Snippet
		appBarLead?: Snippet
		footer?: Snippet,
		appBardEndStyle?: "classic" | "functional"
	} = $props();

	let enableUniversalOverlay = getEnableDialogOverlayContext();

	const onSettingsClick = () => {
		modals.open(GeneralSettingsModal);
	};
</script>

{#snippet header(extraClass: string)}
	<header class={`bg-surface-100-900 shadow-md ${extraClass}`}>

		{#if appState.lead}
			<div class="title-space">
				{@render appState.lead()}
			</div>
		{:else if appBarLead}
			<div class="title-space">
				{@render appBarLead()}
			</div>
		{:else }
			<button onclick={() => { location.href = localizeHref('/'); }} title="Home">
				<img
					aria-hidden="true"
					alt=""
					class="ares-logo"
					src={AresLogo}
				/>
			</button>
			<div class="title-space text-primary-900-100 font-bold">
				{#if appState.title}
					<span class="fake-h3">{appState.title}</span>
				{/if}
			</div>
		{/if}


		{#if appBardEndStyle === 'classic'}
			<button
				title={m.settings()}
				aria-label={m.settings()}
				class="btn-icon preset-outlined-primary-500 hover:brightness-125"
				onclick={onSettingsClick}
			>
				<img class="icon" src={SettingsLogo} aria-hidden="true" alt="">
			</button>
		{:else }
			<div id="header-action-wrapper">
				<!-- site map -->
				<PinyaButton
					title="Navigation"
					onclick={()=>{modals.open(NavigationModal);}}
				>
					<ImageIcon src={HamburgerIcon} aria-hidden="true" alt=""></ImageIcon>
				</PinyaButton>
				<!-- settings -->
				<PinyaButton
					title="Settings"
					buttonVariant={ButtonVariant.Image}
					onclick={()=>{modals.open(GeneralSettingsModal);}}
				>
					<ImageIcon src={SettingsLogo} aria-hidden="true" alt=""></ImageIcon>
				</PinyaButton>
				<PinyaButton
					title="Toggle conversation"
					buttonVariant={ButtonVariant.Image}
					colorScheme={enableUniversalOverlay.value ? ColorScheme.Secondary : undefined}
					onclick={()=>{dialogManager.toggleDialogOverlay();}}
				>
					<ImageIcon src={DialogIcon} aria-hidden="true" alt=""></ImageIcon>
				</PinyaButton>
			</div>
		{/if}
	</header>
{/snippet}

{@render header('hidden shadow-none w-full')}
{@render header('fixed z-15 w-[105vw]')}

<RandomizedBackground enabled={$enableBackground} />

<div id="default-page-container">
	{@render children?.()}
</div>

<UniversalOverlay></UniversalOverlay>

{#if footer}
	{@render footer()}
{:else }
	<div aria-hidden="true" class="footer-space"></div>
{/if}


<style>
		:global {
        #header-action-wrapper {
		        max-height: 2rem;
            display: flex;
            flex-direction: row-reverse;
            gap: 0.5rem;

            &> * {
                padding: 0;
		            aspect-ratio: 1 / 1;
		            height: 100%;

		            &> img {
				            padding: 0.3rem;
		                height: 95%;
				            aspect-ratio: 1 / 1;
				            object-fit: contain;
		            }
            }

            .pinya-button {
                border-radius: 50%;
            }
        }

				:root {
		      --default-page-container-margin: 4rem 1rem 0 1rem;
				}
		}

    header {
        top: 0;
        display: flex;
        padding: 0.5rem calc(0.5rem + 1vw) 0.5rem calc(0.5rem + 5vw);
        align-items: center;
        transform: translateX(-5vw);
    }

    #default-page-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: var(--default-page-container-margin);
        flex-direction: column;
    }

    .ares-logo {
        object-fit: contain;
        height: 2rem;
        margin: 0 1rem 0 0;
        filter: var(--filter-ares-logo);
    }

    .title-space {
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-inline: 1em;
    }

    .footer-space {
        width: 100%;
        height: calc(var(--dialog-box-height) + 3.5lh);
    }
</style>
