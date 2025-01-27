<script lang="ts">
	export let margin = "0";
	export let marginBottom = "2lh";
	export let overrideStyle = "";
	export let includeDataNoSnippet = true;
	export let additionalClass: string[] = [];
	export let turnOnLightModeBorder = true;

	// warning: don't forget the semi-colon when adding new style!
	const style = `
		--turnip-card-margin: ${margin};
		--turnip-card-margin-bottom: ${marginBottom};
		${overrideStyle};
	`;

	if (!$$slots.content) {
		console.error("Missing content slot in card. No content will be displayed.");
	}

	const originalClasses = ["card", "turnip-card"].concat(additionalClass).join(" ");
	let classes = originalClasses.slice();
	const toggleLightModeBorder = (turnOnLightModeBorder: boolean) => {
		classes = originalClasses;
		if (turnOnLightModeBorder) {
			classes += " light-mode-border";
		}
	};
	$: toggleLightModeBorder(turnOnLightModeBorder);
</script>

{#if (includeDataNoSnippet)}
	<div class={classes} style={style} data-nosnippet>
		<slot name="content" class="card" />
	</div>
{:else }
	<div class={classes} style={style}>
		<slot name="content" class="card" />
	</div>
{/if}

<style lang="postcss">
    /*noinspection CssUnusedSymbol*/
    .light-mode-border {
        @apply border-surface-600 border-2 dark:border-0;
    }

    /*noinspection CssUnusedSymbol*/
    .turnip-card {
        @apply bg-surface-100 dark:bg-surface-900;
        margin: var(--turnip-card-margin);
        margin-bottom: var(--turnip-card-margin-bottom);
        border-radius: var(--theme-rounded-container);
    }
</style>
