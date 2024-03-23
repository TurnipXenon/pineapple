<script lang="ts">
	export let margin = "0";
	export let marginBottom = "2lh";
	export let overrideStyle = "";
	export let includeDataNoSnippet = true;

	// warning: don't forget the semi-colon when adding new style!
	const style = `
		--turnip-card-margin: ${margin};
		--turnip-card-margin-bottom: ${marginBottom};
		${overrideStyle};
	`;

	if (!$$slots.content) {
		console.error("Missing content slot in card. No content will be displayed.");
	}
</script>

{#if (includeDataNoSnippet)}
	<div class="card turnip-card" style={style} data-no-snippet>
		<slot name="content" class="card" />
	</div>
{:else }
	<div class="card turnip-card" style={style}>
		<slot name="content" class="card" />
	</div>
{/if}

<style lang="postcss">
    .turnip-card {
        @apply bg-surface-100 dark:bg-surface-900;
        margin: var(--turnip-card-margin);
        margin-bottom: var(--turnip-card-margin-bottom);
        border-radius: var(--theme-rounded-container);
    }
</style>
