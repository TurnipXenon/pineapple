<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import "./blog-template.css";
	import { setIgnoreOverlayOverride } from "$pkg/util/context/pineappleBaseContextDefinitions.svelte";
	import { onDestroy, onMount, type Snippet } from "svelte";
	import BlogTemplateInner from "$pkg/ui/templates/blog_template/BlogTemplateInner.svelte";
	import type { SimplePageMeta } from "$pkg/ui/modules/NavigationMenu/index";
	import { enableUniversalOverlaySvelte4 } from "$pkg/components/dialog_manager/DialogManagerStore";
	import PinyaCard from "../../elements/PinyaCard/PinyaCard.svelte";
	import { appState } from "$pkg/ui/templates/PinyaPageLayout/pinyaPageLayoutRunes.svelte.js";

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

	setIgnoreOverlayOverride(true);

	onMount(() => {
		initialDialogState = $enableUniversalOverlaySvelte4;
		enableUniversalOverlaySvelte4.set(shouldEnableDialogOverlay);
	});

	onDestroy(() => {
		appState.bgOpacity = 1;
		enableUniversalOverlaySvelte4.set(initialDialogState);
	});

	appState.bgOpacity = shouldFillWholePage ? 0.2 : 1;
</script>

{#if shouldFillWholePage}
	<div class="whole-page">
		<BlogTemplateInner pageMeta={pageMeta}>
			{@render children?.()}
		</BlogTemplateInner>
	</div>
{:else}
	<PinyaCard {includeDataNoSnippet} widthClass="max-w-4xl">
		<BlogTemplateInner pageMeta={pageMeta}>
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
</style>
