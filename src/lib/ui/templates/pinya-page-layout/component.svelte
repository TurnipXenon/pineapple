<script lang="ts">
	import type { Snippet } from 'svelte';
	import { m } from '$pkg/paraglide/messages';

	import AresLogo from "$pkg/assets/characters/ares/ares_logo.webp";
	import SettingsLogo from '$pkg/assets/icons/icon-settings.svg';
	import RandomizedBackground from '$pkg/ui/components/randomized-background/RandomizedBackground.svelte';
	import { modals } from 'svelte-modals';
	import GeneralSettingsModal from '$pkg/ui/modules/modals/general-settings/GeneralSettingsModal.svelte';
	import { localizeHref } from '$pkg/paraglide/runtime';
	import { appState } from '$pkg/ui/templates';

	let {
		children,
		appBarLead = $bindable()
	}: {
		children: Snippet
		appBarLead?: Snippet
	} = $props();


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


		<button
			title={m.settings()}
			aria-label={m.settings()}
			class="btn-icon preset-outlined-primary-500 hover:brightness-125"
			onclick={onSettingsClick}
		>
			<img class="icon" src={SettingsLogo} aria-hidden="true" alt="">
		</button>
	</header>
{/snippet}

{@render header('hidden shadow-none w-full')}
{@render header('fixed z-15 w-[105vw]')}

<RandomizedBackground enabled={true} />

<div class="default-page-container">
	{@render children?.()}
</div>
<div aria-hidden="true" class="footer-space"></div>


<style>
    header {
        top: 0;
        display: flex;
        padding: 1rem 1rem 1rem calc(1rem + 5vw);
        align-items: center;
        transform: translateX(-5vw);
    }

    .default-page-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 4rem 1rem 0 1rem;
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