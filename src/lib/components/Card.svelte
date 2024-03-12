<script>
	export let margin = "0";
	export let marginBottom = "3em";
	export let overrideStyle = "";

	// warning: don't forget the semi-colon when adding new style!
	const style = `
		--turnip-card-margin: ${margin};
		--turnip-card-margin-bottom: ${marginBottom};
		${overrideStyle};
	`;
</script>

<div class="card turnip-card" style={style}>
	<slot name="content" class="card" />
</div>

<style lang="postcss">
    .turnip-card {
		    @apply bg-surface-100 dark:bg-surface-900;
        margin: var(--turnip-card-margin);
        margin-bottom: var(--turnip-card-margin-bottom);
		    border-radius: var(--theme-rounded-container);
    }
</style>
