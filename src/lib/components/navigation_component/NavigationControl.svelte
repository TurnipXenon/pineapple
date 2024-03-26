<script lang="ts">
	export let currentIndex = 0;
	export let contentLength: number;
	export let maxPageSize: number;

	import { Card } from "$pkg";

	$: maxIndex = Math.floor(contentLength / maxPageSize);

	const movePage = (isNext: boolean) => {
		if (isNext) {
			currentIndex = currentIndex + 1;
		} else {
			currentIndex = currentIndex - 1;
		}
	};
</script>

<div class="navigation-control-container">
	<button class="navigation-control-button"
	        disabled={currentIndex <= 0}
	        on:click={() => {movePage(false)}}>{"<"}</button>
	<Card marginBottom="0"><p slot="content" style="margin: 1em">Page {currentIndex + 1}</p></Card>
	<button class="navigation-control-button"
	        disabled={currentIndex >= maxIndex}
	        on:click={() => {movePage(true)}}>{">"}</button>
</div>

<style lang="postcss">
    .navigation-control-container {
        display: flex;
        justify-content: space-between;
        margin: 1lh 0;
    }

    .navigation-control-button {
        @apply btn variant-filled-secondary;
    }
</style>