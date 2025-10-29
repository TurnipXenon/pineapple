<!-- TODO: Migration: review and migrate this component -->

<script lang="ts">
	import "./blog-template.css";
	import { onDestroy, onMount, type Snippet } from "svelte";
	import BlogTemplateInner from "$pkg/ui/templates/blog_template/BlogTemplateInner.svelte";
	import type { SimplePageMeta } from "$pkg/ui/modules/NavigationMenu/index";
	import { enableDialogueOverlay } from "$pkg/components/dialog_manager/DialogManagerStore";
	import PinyaCard from "../../elements/PinyaCard/PinyaCard.svelte";
	import { appState } from "$pkg/ui/templates/PinyaPageLayout/runes.svelte";

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

	onMount(() => {
		initialDialogState = $enableDialogueOverlay;
		enableDialogueOverlay.set(shouldEnableDialogOverlay);
	});

	onDestroy(() => {
		appState.bgOpacity = 1;
		enableDialogueOverlay.set(initialDialogState);
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
