<!-- TODO: Documentation: consider documentation showcase -->

<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import { PinyaButton, PinyaCard } from "$pkg/ui/elements/index";

	interface Props {
		currentIndex?: number;
		contentLength: number;
		pageSize: number;
	}

	let {
		currentIndex = $bindable(0),
		contentLength,
		pageSize = $bindable()
	}: Props = $props();

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
		const queryIndex = page.url.searchParams.get("index");
		if (queryIndex) {
			currentIndex = parseInt(queryIndex) || 0;
		}
		const queryPageSize = page.url.searchParams.get("pageSize");
		if (queryPageSize) {
			pageSize = parseInt(queryPageSize) || 5;
		}

		const query = new URLSearchParams(page.url.searchParams.toString());
		query.set("index", currentIndex.toString());
		query.set("pageSize", pageSize.toString());
		goto(`?${query.toString()}`);
	});
</script>

<div class="navigation-control-container">
	<PinyaButton
		classes="w-12 h-12"
		disabled={currentIndex <= 0}
		onclick={() => {movePage(false)}}
	>&lt;
	</PinyaButton>
	<div>
		<PinyaCard widthClass="" paddingClass="pt-2 pb-2 pl-8 pr-8">
			<span class="fake-h2">Page {currentIndex + 1}</span>
		</PinyaCard>
	</div>
	<PinyaButton
		classes="w-12 h-12"
		disabled={(currentIndex + 1) * pageSize >= contentLength}
		onclick={() => {movePage(true)}}
	>&gt;
	</PinyaButton>
</div>

<style>
    .navigation-control-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
