<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import { Modals } from "svelte-modals";
	import { page } from "$app/state";
	import { locales, localizeHref } from "$lib/paraglide/runtime";
	import "$lib/styles/global.css";

	import "$pkg/styles/app.css";
	import { ToastProvider } from "@skeletonlabs/skeleton-svelte";

	let { children } = $props();
</script>

<Modals>
	<!-- shown when any modal is opened -->
	{#snippet backdrop({ close })}
		<div
			aria-hidden="true"
			class="backdrop"
			onclick={() => close()}
		></div>
	{/snippet}
</Modals>
<ModeWatcher defaultTheme="turnip" />

<ToastProvider>
	{@render children()}
</ToastProvider>

<!--invisible ink-->
<div style="display:none">
	{#each locales as locale (locale)}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>

<style>
    .backdrop {
        position: fixed;
        z-index: 19;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.50);
        backdrop-filter: blur(4px);
    }
</style>