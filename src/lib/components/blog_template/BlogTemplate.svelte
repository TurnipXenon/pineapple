<script lang="ts">
	import "./blog-template.css";
	import { enableBackground } from "$pkg/store";
	import { onDestroy, onMount } from "svelte";
	import BlogTemplateInner from "$pkg/components/blog_template/BlogTemplateInner.svelte";
	import type { SimplePageMeta } from "$pkg/ui/modules/NavigationMenu/index";
	import { enableDialogueOverlay } from "$pkg/components/dialog_manager/DialogManagerStore";
	import { default as Card } from "$pkg/components/Card.svelte";

	// grab page meta from the adjacent meta.json
	interface Props {
		pageMeta: SimplePageMeta;
		shouldFillWholePage?: boolean;
		shouldEnableDialogOverlay?: boolean;
		includeDataNoSnippet?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		pageMeta,
		shouldFillWholePage = false,
		shouldEnableDialogOverlay = false,
		includeDataNoSnippet = false,
		children
	}: Props = $props();

	enableBackground.set(!shouldFillWholePage);
	let initialDialogState = false;

	onMount(() => {
		initialDialogState = $enableDialogueOverlay;
		enableDialogueOverlay.set(shouldEnableDialogOverlay);
	});

	onDestroy(() => {
		enableBackground.set(true);
		enableDialogueOverlay.set(initialDialogState);
	});

</script>

{#if shouldFillWholePage}
	<div class="whole-page">
		<BlogTemplateInner pageMeta={pageMeta}>
			{@render children?.()}
		</BlogTemplateInner>
	</div>
{:else}
	<Card includeDataNoSnippet={includeDataNoSnippet}>
		{#snippet content()}
				<div  class="default-card">
				<BlogTemplateInner pageMeta={pageMeta}>
					{@render children?.()}
				</BlogTemplateInner>
			</div>
			{/snippet}
	</Card>
{/if}

<style>
    .whole-page {
        height: 100%;
        width: 100%;
        max-width: var(--default-card-max-width);
    }
</style>