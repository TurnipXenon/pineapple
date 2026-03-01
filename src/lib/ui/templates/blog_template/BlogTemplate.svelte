<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import "./blog-template.css";
	import { browser } from "$app/environment";
	import { enableUniversalOverlaySvelte4 } from "$pkg/components/dialog_manager/DialogManagerStore";
	import type { SimplePageMeta } from "$pkg/ui/modules/NavigationMenu/index";
	import BlogTemplateInner from "$pkg/ui/templates/blog_template/BlogTemplateInner.svelte";
	import { appState } from "$pkg/ui/templates/PinyaPageLayout/pinyaPageLayoutRunes.svelte.js";
	import { setIgnoreOverlayOverride } from "$pkg/util/context/pineappleBaseContextDefinitions.svelte";
	import { onDestroy, onMount, type Snippet } from "svelte";
	import PinyaCard from "../../elements/PinyaCard/PinyaCard.svelte";

	// grab page meta from the adjacent meta.json
	interface Props {
		pageMeta: SimplePageMeta;
		shouldFillWholePage?: boolean;
		shouldEnableDialogOverlay?: boolean;
		includeDataNoSnippet?: boolean;
		children?: Snippet;
	}

	let {
		pageMeta,
		shouldFillWholePage = false,
		shouldEnableDialogOverlay = false,
		includeDataNoSnippet = false,
		children
	}: Props = $props();

	let initialDialogState = false;

	setIgnoreOverlayOverride({ value: true });

	onMount(() => {
		initialDialogState = $enableUniversalOverlaySvelte4;
		enableUniversalOverlaySvelte4.set(shouldEnableDialogOverlay);
	});

	onDestroy(() => {
		if (browser) {
			appState.bgOpacity = 1;
			enableUniversalOverlaySvelte4.set(initialDialogState);
		}
	});

	$effect(() => {
		appState.bgOpacity = shouldFillWholePage ? 0.2 : 1;
	});
</script>

{#if shouldFillWholePage}
	<div class="whole-page">
		<BlogTemplateInner {pageMeta}>
			{@render children?.()}
		</BlogTemplateInner>
	</div>
{:else}
	<PinyaCard {includeDataNoSnippet} widthClass="blog-template">
		<BlogTemplateInner {pageMeta}>
			{@render children?.()}
		</BlogTemplateInner>
	</PinyaCard>
{/if}

<style>
    .whole-page {
        height: 100vh;
        width: 100%;
        padding-right: 2em;
        padding-left: 2em;
    }

    :global(.blog-template) {
        max-width: 64em;
        width: 100%;
        margin: auto;
    }
</style>
