<script lang="ts">
	import { Card, enableDialogueOverlay, type SimplePageMeta } from "$pkg";
	import "./blog-template.css";
	import { enableBackground } from "$pkg/store";
	import { onDestroy, onMount } from "svelte";
	import BlogTemplateInner from "$pkg/components/blog_template/BlogTemplateInner.svelte";

	// grab page meta from the adjacent meta.json
	export let pageMeta: SimplePageMeta;
	export let shouldFillWholePage = false;
	export let shouldEnableDialogOverlay = false;
	export let includeDataNoSnippet = false;

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
			<slot />
		</BlogTemplateInner>
	</div>
{:else}
	<Card includeDataNoSnippet={includeDataNoSnippet}>
		<div slot="content" class="default-card">
			<BlogTemplateInner pageMeta={pageMeta}>
				<slot />
			</BlogTemplateInner>
		</div>
	</Card>
{/if}

<style>
    .whole-page {
        height: 100%;
        width: 100%;
        max-width: var(--default-card-max-width);
    }
</style>