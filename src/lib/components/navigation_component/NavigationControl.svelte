<script lang="ts">
	import { onMount } from "svelte";

	export let currentIndex = 0;
	export let contentLength: number;
	export let pageSize: number;

	import { Card } from "$pkg";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	const queryIndex = $page.url.searchParams.get("index");
	if (queryIndex) {
		currentIndex = parseInt(queryIndex) || 0;
	}
	const queryPageSize = $page.url.searchParams.get("pageSize");
	if (queryPageSize) {
		pageSize = parseInt(queryPageSize) || 5;
	}

	const movePage = (isNext: boolean) => {
		if (isNext) {
			currentIndex = currentIndex + 1;
		} else {
			currentIndex = currentIndex - 1;
		}

		const query = new URLSearchParams($page.url.searchParams.toString());
		query.set("index", currentIndex.toString());
		goto(`?${query.toString()}`);
	};

	onMount(() => {
		const query = new URLSearchParams($page.url.searchParams.toString());
		query.set("index", currentIndex.toString());
		query.set("pageSize", pageSize.toString());
		goto(`?${query.toString()}`);
	});
</script>

<div class="navigation-control-container">
	<button class="navigation-control-button"
	        disabled={currentIndex <= 0}
	        on:click={() => {movePage(false)}}>{"<"}</button>
	<Card marginBottom="0"><p slot="content" style="margin: 1em">Page {currentIndex + 1}</p></Card>
	<button class="navigation-control-button"
	        disabled={(currentIndex + 1) * pageSize >= contentLength}
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