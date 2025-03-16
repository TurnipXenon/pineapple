<script lang="ts">
	import { run } from 'svelte/legacy';

	interface Props {
		margin?: string;
		marginBottom?: string;
		overrideStyle?: string;
		includeDataNoSnippet?: boolean;
		additionalClass?: string[];
		turnOnLightModeBorder?: boolean;
		content?: import('svelte').Snippet<[any]>;
	}

	let {
		margin = "0",
		marginBottom = "2lh",
		overrideStyle = "",
		includeDataNoSnippet = true,
		additionalClass = [],
		turnOnLightModeBorder = true,
		content
	}: Props = $props();

	// warning: don't forget the semi-colon when adding new style!
	const style = `
		--turnip-card-margin: ${margin};
		--turnip-card-margin-bottom: ${marginBottom};
		${overrideStyle};
	`;

	if (!content) {
		console.error("Missing content slot in card. No content will be displayed.");
	}

	const originalClasses = ["card", "turnip-card bg-surface-100 dark:bg-surface-900"].concat(additionalClass).join(" ");
	let classes = $state(originalClasses.slice());
	const toggleLightModeBorder = (turnOnLightModeBorder: boolean) => {
		classes = originalClasses;
		if (turnOnLightModeBorder) {
			classes += " light-mode-border border-surface-600 border-2 dark:border-0";
		}
	};
	run(() => {
		toggleLightModeBorder(turnOnLightModeBorder);
	});
</script>

{#if (includeDataNoSnippet)}
	<div class={classes} style={style} data-nosnippet>
		{@render content?.({ class: "card", })}
	</div>
{:else }
	<div class={classes} style={style}>
		{@render content?.({ class: "card", })}
	</div>
{/if}

<style>
    .turnip-card {
        margin: var(--turnip-card-margin);
        margin-bottom: var(--turnip-card-margin-bottom);
        border-radius: var(--theme-rounded-container);
    }
</style>
