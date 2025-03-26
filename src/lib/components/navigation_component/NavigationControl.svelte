<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/state";

	import { Card } from "$pkg/components/index";
	import { goto } from "$app/navigation";

	interface Props {
		currentIndex?: number;
		contentLength: number;
		pageSize: number;
	}

	let { currentIndex = $bindable(0), contentLength, pageSize = $bindable() }: Props = $props();

	const queryIndex = page.url.searchParams.get("index");
	if (queryIndex) {
		currentIndex = parseInt(queryIndex) || 0;
	}
	const queryPageSize = page.url.searchParams.get("pageSize");
	if (queryPageSize) {
		pageSize = parseInt(queryPageSize) || 5;
	}

	const movePage = (isNext: boolean) => {
		if (isNext) {
			currentIndex = currentIndex + 1;
		} else {
			currentIndex = currentIndex - 1;
		}

		const query = new URLSearchParams(page.url.searchParams.toString());
		query.set("index", currentIndex.toString());
		goto(`?${query.toString()}`);
	};

	onMount(() => {
		const query = new URLSearchParams(page.url.searchParams.toString());
		query.set("index", currentIndex.toString());
		query.set("pageSize", pageSize.toString());
		goto(`?${query.toString()}`);
	});
</script>

<div class="navigation-control-container">
	<button class="navigation-control-button"
	        disabled={currentIndex <= 0}
	        onclick={() => {movePage(false)}}>{"<"}</button>
	<Card marginBottom="0">
		{#snippet content()}
			<p style="margin: 1em">Page {currentIndex + 1}</p>
		{/snippet}
	</Card>
	<button class="navigation-control-button"
	        disabled={(currentIndex + 1) * pageSize >= contentLength}
	        onclick={() => {movePage(true)}}>{">"}</button>
</div>

<style lang="postcss">
    .navigation-control-container {
        display: flex;
        justify-content: space-between;
        margin: 1lh 0;
    }

    .navigation-control-button {
		    /* todo: migration */
        /*@apply btn preset-filled-secondary-500;*/
    }
</style>